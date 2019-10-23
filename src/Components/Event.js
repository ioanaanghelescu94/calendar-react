import React, { useState } from "react";

const Event = props => {
  const [event, setEvent] = useState(props.event);

  return (
    <div
      className="event"
      key={props.id}
      style={{ backgroundColor: `${props.color}` }}
    >
      {props.onEdit ? (
        <input
          className="edit_text"
          value={event}
          onChange={e => setEvent(e.target.value)}
        />
      ) : (
        <p className="event_name">{props.event}</p>
      )}

      <div
        className="edit_delete_container"
        style={{ display: props.onEdit && "none" }}
      >
        <div
          className="edit"
          onClick={(e, eventId, dayIndex) =>
            props.editEvent(e, props.id, props.dayIndex)
          }
        >
          &#9998;
        </div>

        <div
          className="delete"
          onClick={(e, eventId, dayIndex) =>
            props.deleteEvent(e, props.id, props.dayIndex)
          }
        >
          &#x2715;
        </div>
      </div>

      <div
        className="save_cancel_container"
        style={{ display: !props.onEdit && "none" }}
      >
        <div
          className="save"
          onClick={() =>
            props.saveEventChanges(props.id, props.dayIndex, event)
          }
        >
          &#10003;
        </div>

        <div
          className="cancel"
          onClick={(e, eventId, dayIndex) =>
            props.editEvent(e, props.id, props.dayIndex)
          }
        >
          cancel
        </div>
      </div>
    </div>
  );
};

export default Event;
