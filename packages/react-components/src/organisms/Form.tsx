import { ReactNode, useRef, useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { css } from '@emotion/react';

import { noop } from '../utils';
import Toast from './Toast';

const styles = css({
  boxSizing: 'border-box',
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'max-content 1fr',
  overflow: 'auto',
});

type FormProps<T> = {
  onSave?: () => void | Promise<T | void>;
  validate?: () => boolean;
  dirty: boolean; // mandatory so that it cannot be forgotten
  children: (state: {
    isSaving: boolean;
    onSave: () => void | Promise<T | void>;
  }) => ReactNode;
};
const Form = <T extends void | Record<string, unknown>>({
  dirty,
  children,
  validate = () => true,
  onSave = noop,
}: FormProps<T>): React.ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] =
    useState<'initial' | 'isSaving' | 'hasError' | 'hasSaved'>('initial');
  useEffect(() => {
    if (status === 'hasSaved' && !dirty) {
      setStatus('initial');
    }
  }, [status, dirty]);
  const wrappedOnSave = async () => {
    const parentValidation = validate();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (formRef.current!.reportValidity() && parentValidation) {
      setStatus('isSaving');
      try {
        const result = await onSave();
        if (formRef.current) {
          setStatus('hasSaved');
        }
        return result;
      } catch {
        if (formRef.current) {
          setStatus('hasError');
        }
      }
    }
    return Promise.resolve();
  };

  return (
    <>
      <Prompt
        when={
          status === 'isSaving' ||
          status === 'hasError' ||
          (status === 'initial' && dirty)
        }
        message="Are you sure you want to leave? Unsaved changes will be lost."
      />
      {status === 'hasError' && (
        <Toast>
          There was an error and we were unable to save your changes
        </Toast>
      )}
      <form ref={formRef} css={styles}>
        {children({ isSaving: status === 'isSaving', onSave: wrappedOnSave })}
      </form>
    </>
  );
};
export default Form;
