use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use thiserror::Error;

#[derive(Serialize, Debug)]
pub struct ServerError {
    pub message: String,
}

impl ServerError {
    pub fn new(message: String) -> Self {
        Self { message }
    }
}

#[derive(Debug, Error)]
pub enum ShuttleServerError {
    #[error("{0}")]
    StartupFailed(#[from] hyper::Error),
    #[error("{0}")]
    ReqwestFailed(#[from] reqwest::Error),
}

impl IntoResponse for ShuttleServerError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            Self::StartupFailed(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()),
            Self::ReqwestFailed(err) => (StatusCode::BAD_REQUEST, err.to_string()),
        };

        // I'm not a fan of the error specification, so for the sake of consistency,
        // serialize singular errors as a map of vectors similar to the 422 validation responses
        let body = Json(ServerError::new(error_message));

        (status, body).into_response()
    }
}
