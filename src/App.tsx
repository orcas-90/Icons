import React, { MouseEvent, useState } from 'react';

import './App.css';

import { Icons } from './components/Icons/Icons';

import ReactDOM from 'react-dom';
import { IconProp, SizeProp, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAllergies,
  faAmbulance,
  faAsterisk,
  faAt,
  faAtlas,
  faAtom,
  faAward,
  faBaby,
  faBrain,
  faCannabis,
  faCar,
  faCat,
  faDove,
  faGhost,
  faGift,
  faHeadset,
  faHeart,
  faHeartBroken,
  faHeartbeat,
  faPaw,
  faVolleyballBall,
  faWineBottle,
  faWineGlass,
  faXRay,
} from '@fortawesome/free-solid-svg-icons';
import { uid } from 'uid';

library.add(
  faAt,
  faAllergies,
  faAmbulance,
  faAsterisk,
  faAtlas,
  faAtom,
  faAward,
  faBaby,
  faBrain,
  faCannabis,
  faCar,
  faCat,
  faDove,
  faGhost,
  faGift,
  faHeadset,
  faHeart,
  faHeartBroken,
  faHeartbeat,
  faPaw,
  faVolleyballBall,
  faWineBottle,
  faWineGlass,
  faXRay
);

function App() {
  type Icons = {
    icon: IconProp;
    color: string;
    size: SizeProp;
    id: string;
    top: number | undefined;
    left: number | undefined;
  };

  const [addIcon, setAddIcon] = useState<Icons[]>([]);

  const handleAddElement = (
    color: string,
    icon: string,
    size: string,
    id: string,
    top: number | undefined,
    left: number | undefined
  ) => {
    setAddIcon((prev) => [
      ...prev,
      {
        color,
        icon: icon as IconProp,
        size: size as SizeProp,
        id: uid(5),
        top,
        left,
      },
    ]);
  };

  const getDeleteIcon = (indexCur: string) => {
    return () => {
      setAddIcon((prev) => prev.filter((icon) => icon.id !== indexCur));
    };
  };

  return (
    <div className="App">
      <Icons onSubmit={handleAddElement}></Icons>

      {addIcon.map((elem) => (
        <FontAwesomeIcon
          className="Font"
          onClick={getDeleteIcon(elem.id)}
          key={elem.id}
          icon={elem.icon}
          size={elem.size}
          color={elem.color}
          style={{ top: elem.top, left: elem.left }}
        />
      ))}
    </div>
  );
}

export { App };
