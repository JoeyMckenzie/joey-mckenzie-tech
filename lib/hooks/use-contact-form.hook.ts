import { useForm } from '@formspree/react';
import { useState, ChangeEventHandler, useCallback, useEffect } from 'react';
import { useAlertContext } from '../contexts/alert.context';

export function useContactForm() {
  const { dispatch } = useAlertContext();
  const [{ submitting, succeeded, errors }, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_API_KEY ?? ''
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string>();

  const onNameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setName(e.target.value),
    [setName]
  );

  const onEmailChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setEmail(e.target.value),
    [setEmail]
  );

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setMessage(e.target.value),
    [setMessage]
  );

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    if (!submitting) {
      if (succeeded) {
        dispatch('OPEN_MODAL');
        resetForm();
      } else if (errors && errors.length > 0) {
        console.error(errors);
        dispatch('OPEN_NOTIFICATION');
      }
    }
  }, [dispatch, errors, submitting, succeeded]);

  return {
    handleSubmit,
    onNameChange,
    name,
    email,
    onEmailChange,
    message,
    onMessageChange,
    submitting,
  };
}