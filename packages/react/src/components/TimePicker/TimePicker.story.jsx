/* eslint-disable react/destructuring-assignment */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, array, object } from '@storybook/addon-knobs';
import classnames from 'classnames';

import { settings } from '../../constants/Settings';
import useMerged from '../../hooks/useMerged';
import Button from '../Button';

import TimePicker, { TimePickerSpinner } from './TimePicker';
import ListSpinner from './ListSpinner';

const { iotPrefix } = settings;

const sizes = {
  'Large size (lg)': 'lg',
  'Medium Size (md)': 'md',
  'Small size (sm)': 'sm',
};

const props = {
  timepicker: () => ({
    type: select('Input Type', ['single', 'range'], 'single'),
    pattern: text(
      'Regular expression for the value (pattern in <TimePicker>)',
      '(1[012]|[1-9]):[0-5][0-9](\\s)?'
    ),
    placeholder: text('Placeholder text (placeholder in <TimePicker>)', 'hh:mm'),
    disabled: boolean('Disabled (disabled in <TimePicker>)', false),
    light: boolean('Light variant (light in <TimePicker>)', false),
    labelText: text('Label text (labelText in <TimePicker>)', 'Select a time'),
    invalid: boolean('Show form validation UI (invalid in <TimePicker>)', false),
    invalidText: text(
      'Form validation UI content (invalidText in <TimePicker>)',
      'A valid value is required'
    ),
    maxLength: number('Maximum length (maxLength in <TimePicker>)', 5),
    size: select('Field size (size)', sizes, 'md'),
    onClick: action('onClick'),
    onChange: action('onChange'),
    onBlur: action('onBlur'),
  }),
  select: () => ({
    disabled: boolean('Disabled (disabled in <TimePickerSelect>)', false),
    labelText: text('Label text (labelText in <TimePickerSelect>)', 'Please select'),
    'aria-label': text(
      "Trigger icon description ('aria-label' in <TimePickerSelect>)",
      'open list of options'
    ),
  }),
};

export default {
  title: '1 - Watson IoT/TimePicker',
  parameters: {
    component: TimePicker,
  },
};

const listItems = Array.from(Array(12)).map((el, i) => {
  const index = i + 1 < 10 ? `0${i + 1}` : i + 1;
  return (
    <li id={`hour-${index}`}>
      <Button id={`hour-${index}-button`} kind="ghost">
        {index}
      </Button>
    </li>
  );
});

export const Default = () => {
  const defaultValue = [
    select('1st default value', ['10:30am', undefined], undefined),
    select('2nd default value', ['11:30pm', undefined], undefined),
  ];
  return (
    <TimePicker
      key={defaultValue[0] + defaultValue[1]}
      defaultValue={defaultValue}
      readOnly={boolean('Read only', false)}
      hideLabel={boolean('Hide label', false)}
      hideSecondaryLabel={boolean('Hide secondary label', false)}
      className="this that"
      id="time-picker"
      i18n={object('i18n', {
        labelText: 'Start',
        secondaryLabelText: 'End',
        helperText: 'This is some helper text',
        warnText: 'You have been warned',
      })}
      type={select('Type', ['single', 'range'], 'single')}
      invalid={[boolean('First input invalid', false), boolean('Second input invalid', false)]}
      warn={[
        boolean('Show first input warning state', false),
        boolean('Show second input warning state', false),
      ]}
      size={select('Size', ['sm', 'md', 'lg'], 'md')}
      light={boolean('Light variant (light in <TimePicker>)', false)}
      disabled={boolean('Disabled (disabled in <TimePicker>)', false)}
    />
  );
  // return <TimePickerSpinner id="time-picker" className="my-table-yeah" {...props.timepicker()} />;
};

export const TimePickerSpinnerStory = () => {
  return <TimePickerSpinner id="time-picker" className="my-table-yeah" {...props.timepicker()} />;
};

TimePickerSpinnerStory.storyName = 'TimePicker spinner';
TimePickerSpinnerStory.parameters = {
  component: TimePickerSpinner,
};

export const ListSpinnerStory = () => {
  return (
    <ListSpinner
      listItems={listItems}
      defaultSelectedId="hour-12"
      onChange={() => action('onChange called')}
    />
  );
};

ListSpinnerStory.storyName = 'List spinner';
ListSpinnerStory.parameters = {
  component: ListSpinner,
};
