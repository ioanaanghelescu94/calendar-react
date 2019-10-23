import React from "react";
import Event from "./Event";

const Day = props => {
  return (
    <div className="day">
      <h4>{props.day.name}</h4>

      <div className="event_container">
        {props.day.events.map((event, index) => (
          <Event
            event={event.event}
            onEdit={event.onEdit}
            id={event.id}
            key={event.id}
            color={event.bkgColor}
            dayIndex={props.dayIndex}
            deleteEvent={props.deleteEvent}
            editEvent={props.editEvent}
            input={props.input}
            updateInput={props.updateInput}
            saveEventChanges={props.saveEventChanges}
          />
        ))}
      </div>
    </div>
  );
};

export default Day;
