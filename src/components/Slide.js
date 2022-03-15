import React from 'react';
import AddImage from './AddImage';
import { useParams } from 'react-router-dom';

export default function Slide() {
  const params = useParams()
  return <div>
      <p>{params.patientID}</p>
      <p>{params.slideID}</p>
      <AddImage/>
  </div>;
}
