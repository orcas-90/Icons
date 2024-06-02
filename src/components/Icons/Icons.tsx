import { cnIcons } from './Icons.classname';
import { useState, type MouseEvent, useEffect } from 'react';
//import { uid } from 'uid';

import type {
  ChangeEvent,
  DragEventHandler,
  FC,
  FormEvent,
  MouseEventHandler,
} from 'react';

import './Icons.css';
import { uid } from 'uid';

import JSON from './icons.json';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

type IconsFormData = {
  color: string;
  icon: string;
  size: string;
};

type ChatSendFormProps = {
  onSubmit: (
    color: string,
    icon: string,
    size: string,
    id: string,
    top: number | undefined,
    left: number | undefined
  ) => void;
};

const solidIcons = JSON.solid;
const sizesIcon = ['2x', '3x', '4x', '5x', '6x'];
const id = uid(5);

const Icons: FC<ChatSendFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<IconsFormData>({
    color: 'red',
    icon: 'ambulance',
    size: '2x',
  });
  const [top, setAddTop] = useState<number | undefined>(undefined);
  const [left, setAddLeft] = useState<number | undefined>(undefined);
  const [absentForm, setAbsentForm] = useState('form');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(form.color, form.icon, form.size, id, top, left);
    setAddTop(undefined);
    setAddLeft(undefined);
  };

  const handleChangeIcons = (event: ChangeEvent) => {
    const target = event.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [target.name]:
        target.type === 'checkbox'
          ? (target as HTMLInputElement).checked
          : target.value,
    }));
  };
  const handleClick = (event: MouseEvent) => {
    if (top !== undefined) {
      return;
    }
    setAbsentForm('');

    const topIcon = event.pageY;
    const leftIcon = event.pageX;
    setAddTop(topIcon);
    setAddLeft(leftIcon);
  };
  const handleAbsentForm = (event: MouseEvent) => {
    setAbsentForm('form');
  };

  return (
    <div className={cnIcons('wrap')} onClick={handleClick}>
      <form className={cnIcons(absentForm)} onSubmit={handleSubmit}>
        <div className={cnIcons()}>
          <select
            className={cnIcons()}
            name="icon"
            id="icon"
            onChange={handleChangeIcons}
            value={form.icon}
          >
            {solidIcons.map((solidIcon, index) => (
              <option key={index} value={solidIcon}>
                {solidIcon}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color">Write icon's color:</label>
          <input
            name="color"
            onChange={handleChangeIcons}
            value={form.color}
          ></input>
        </div>
        <div className={cnIcons()}>
          <select
            className={cnIcons()}
            name="size"
            id="size"
            onChange={handleChangeIcons}
            value={form.size}
          >
            {sizesIcon.map((sizeIcon, index) => (
              <option key={index} value={sizeIcon}>
                {sizeIcon}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAbsentForm}>Add Icons</button>
      </form>
    </div>
  );
};

export { Icons };
