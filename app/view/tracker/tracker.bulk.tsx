import React, { FC } from 'react'
import { onChange, } from './tracker.util'

interface TrackerBulkProps {
  showBulk: boolean
  setShowBulk: React.Dispatch<React.SetStateAction<boolean>>
  setBulkText: React.Dispatch<React.SetStateAction<string>>
  addBulk: () => void
}

const TrackerBulk: FC<TrackerBulkProps> = (props) =>{
    return <>
    <button type="submit" onClick={() => { props.setShowBulk(!props.showBulk) }} className="btn btn-primary btn-block mb-4" >
      Show Bulk
    </button>
    {
      props.showBulk && <div>
        Bulk Text:<br/>
        <textarea onChange={onChange(props.setBulkText)} className='tracker-domain-query-bulk-textarea'></textarea>
        <button type="submit" onClick={props.addBulk} className="btn btn-primary btn-block mb-4" >
          Add Bulk
        </button>
      </div>
    }
    </>
}


export default TrackerBulk