use leptos::*;

#[component]
pub fn SocialButtons() -> impl IntoView {
    view! {
        <div class="flex flex-row mx-auto justify-center">
            <a type="button" href="https://github.com/joeymckenzie" class="btn">
                <span class="icon-[mdi--github]"></span>
                "GitHub"
            </a>
        </div>
    }
}