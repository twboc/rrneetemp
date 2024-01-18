import React, { FC, useEffect, useState } from 'react'

interface TrackerLocationProps {
  locations: string[]
  checkbox: (location: string) => () => void
}

const TrackerLocation: FC<TrackerLocationProps> = (props) =>{

    return <div>
    Locations:<br/>
    {props.locations.join(', ')}
    <br/>
    <br/>
    <div className="tracker-domain-locations-list" >
      <div>No Location <input type="checkbox" checked={props.locations.indexOf('no_location') >= 0} onChange={props.checkbox('no_location')} /> | </div>
      <div>Poznań <input type="checkbox" checked={props.locations.indexOf('Poznań') >= 0} onChange={props.checkbox('Poznań')} /> | </div>
      <div>Szczecin <input type="checkbox" checked={props.locations.indexOf('Szczecin') >= 0} onChange={props.checkbox('Szczecin')} /> | </div>
      <div>Katowice <input type="checkbox" checked={props.locations.indexOf('Katowice') >= 0} onChange={props.checkbox('Katowice')} /> | </div>
      <div>Bydgoszcz <input type="checkbox" checked={props.locations.indexOf('Bydgoszcz') >= 0} onChange={props.checkbox('Bydgoszcz')} /> | </div>
      <div>Ruda Śląska <input type="checkbox" checked={props.locations.indexOf('Ruda Śląska') >= 0} onChange={props.checkbox('Ruda Śląska')} /> | </div>
      <div>Tychy <input type="checkbox" checked={props.locations.indexOf('Tychy') >= 0} onChange={props.checkbox('Tychy')} /> | </div>
      <div>Gliwice <input type="checkbox" checked={props.locations.indexOf('Gliwice') >= 0} onChange={props.checkbox('Gliwice')} /> | </div>
      <div>Rybnik <input type="checkbox" checked={props.locations.indexOf('Rybnik') >= 0} onChange={props.checkbox('Rybnik')} /> | </div>
      <div>Bytom <input type="checkbox" checked={props.locations.indexOf('Bytom') >= 0} onChange={props.checkbox('Bytom')} /> | </div>
      <div>Dąbrowa Górnicza <input type="checkbox" checked={props.locations.indexOf('Dąbrowa Górnicza') >= 0} onChange={props.checkbox('Dąbrowa Górnicza')} /> | </div>
      <div>Mikołów <input type="checkbox" checked={props.locations.indexOf('Mikołów') >= 0} onChange={props.checkbox('Mikołów')} /> | </div>
      <div>Zabrze <input type="checkbox" checked={props.locations.indexOf('Zabrze') >= 0} onChange={props.checkbox('Zabrze')} /> | </div>
      <div>Chorzów <input type="checkbox" checked={props.locations.indexOf('Chorzów') >= 0} onChange={props.checkbox('Chorzów')} /> | </div>
      <div>Tarnowskie Góry <input type="checkbox" checked={props.locations.indexOf('Tarnowskie Góry') >= 0} onChange={props.checkbox('Tarnowskie Góry')} /> | </div>
    </div>
    
  </div>
}


export default TrackerLocation