import { useContext, useEffect } from 'react';

import { FormContext, FormNoContext } from '../context';

import { filterObject } from '../lib/util';
import Logger from '../lib/logger';

function getFormListValuesByName (form, name) {
  if (!form || !form.elements) return [];
  const list = Array.from(form.elements).filter(input => input.name === name);
  const checked = list.filter(input => !!input.checked);
  const values = checked.map(input => input.value);
  return values;
}

const INPUT_PROPS_WHITELIST = [
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'defaultValue',
  'disabled',
  'id',
  'inputMode',
  'maxLength',
  'minLength',
  'name',
  'options',
  'pattern',
  'placeholder',
  'required',
  'type',
  'value'
];

const INPUT_LIST_TYPES = ['radio', 'checkbox'];

const logger = new Logger('useInput', {
  isBrowser: true
});

const useInput = ({ inputRef = {}, props = {} }) => {
  const { invalidFields = [], updateField } =
    useContext(FormContext) || FormNoContext;

  const { type, label, required, onInput, onChange } = props;
  const inputRules = {};
  let isInvalid = false;

  // Only include the input props that we know for sure we want to have in the DOM

  const inputProps = filterObject(props, key =>
    INPUT_PROPS_WHITELIST.includes(key)
  );

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  // Missing name prevents form functionality from working so warn about it

  if (!inputProps.name) {
    logger.warn(`Missing input name: ${JSON.stringify(inputProps)}`);
  }

  // Check if our input is invalid from a form level

  if (Array.isArray(invalidFields) && invalidFields.includes(inputProps.name)) {
    isInvalid = true;
  }

  // Patch in any local rules passed directly to the input

  if (required) {
    inputRules.required = true;
  }

  useEffect(() => {
    const { current } = inputRef;
    let value = inputProps.defaultValue || inputProps.value;
    if (type === 'radio' || type === 'checkbox') {
      value = getFormListValuesByName(current.form, inputProps.name);
    }
    // Update the field immediately with any local rules for validation and default value
    updateField(inputProps.name, value, inputRules);
  }, []);

  inputProps.onInput = function (event) {
    if (!INPUT_LIST_TYPES.includes(type)) {
      updateField(event.target.name, event.target.value);
    }

    if (typeof onInput === 'function') {
      onInput(event);
    }
  };

  inputProps.onChange = function (event) {
    const type = event.target.type;
    const name = event.target.name;
    let value = event.target.value;

    if (INPUT_LIST_TYPES.includes(type)) {
      value = getFormListValuesByName(event.target.form, name);
      console.info('list', type, name, value);
      updateField(event.target.name, [...value]);
    }

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return {
    id: inputProps.id,
    name: inputProps.name,
    options: props.options,
    type: inputProps.type,
    label,
    inputProps,
    inputRules,
    isInvalid
  };
};

export default useInput;
