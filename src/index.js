import React from "react";
import ReactDOM from "react-dom";
import uuid from "uuid";

import "./styles.css";
import Day from "./Components/Day";
import Form from "./Components/Form";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weekdays: [
        {
          name: "Luni",
          date: null,
          events: []
        },
        {
          name: "Marti",
          date: null,
          events: []
        },
        {
          name: "Miercuri",
          date: null,
          events: []
        },
        {
          name: "Joi",
          date: null,
          events: []
        },
        {
          name: "Vineri",
          date: null,
          events: []
        },
        {
          name: "Sambata",
          date: null,
          events: []
        },
        {
          name: "Duminica",
          date: null,
          events: []
        }
      ],
      selectedDay: 0,
      input: ""
    };
  }

  // draggable = () => {
  //   $( ".ui-draggable" ).draggable();
  // }

  selectDay = e => {
    var dayIndex = e.target.selectedIndex;

    this.setState({
      selectedDay: dayIndex
    });
  };

  updateInput = input => {
    this.setState({
      input: input.value
    });
  };

  uploadEvent = () => {
    if (this.state.input === "") {
      alert("Please fill in field");
    } else {
      var newEvent = this.state.input;
      var selectedDay = this.state.selectedDay;
      var weekdays = [...this.state.weekdays];
      const id = uuid.v4();

      const newEventObject = {
        event: newEvent,
        id: id,
        bkgColor: this.randomizeColor(),
        onEdit: false
      };
      console.log(newEventObject);

      weekdays[selectedDay].events.push(newEventObject);

      this.setState({
        weekdays: weekdays,
        input: ""
      });
    }
  };

  randomizeColor = index => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    return rgb;
  };

  deleteEvent = (e, eventId, dayIndex) => {
    var weekdays = this.state.weekdays;
    var events = [...weekdays[dayIndex].events];
    weekdays[dayIndex].events = events.filter(event => event.id !== eventId);

    this.setState({
      weekdays
    });
  };

  editEvent = (e, eventId, dayIndex) => {
    var weekdays = this.state.weekdays;
    var events = [...weekdays[dayIndex].events];
    var editedEventIndex = events.findIndex(event => event.id === eventId);
    !weekdays[dayIndex].events[editedEventIndex].onEdit
      ? (weekdays[dayIndex].events[editedEventIndex].onEdit = true)
      : (weekdays[dayIndex].events[editedEventIndex].onEdit = false);

    this.setState({
      weekdays
    });
  };

  saveEventChanges = (eventId, dayIndex, event) => {
    console.log(eventId, dayIndex, event);
    var weekdays = this.state.weekdays;
    var editedEventIndex = weekdays[dayIndex].events.findIndex(
      event => event.id === eventId
    );
    weekdays[dayIndex].events[editedEventIndex].event = event;
    weekdays[dayIndex].events[editedEventIndex].onEdit = false;

    console.log("aici");
    this.setState({
      weekdays
    });
  };

  render() {
    return (
      <div className="App">
        <h4>Calendar</h4>
        <h4 style={{ fontWeight: "normal" }}>
          One can add, update and remove events.
        </h4>

        <div className="week">
          {this.state.weekdays.map((day, index) => (
            <Day
              day={day}
              dayIndex={index}
              key={index}
              colorIndex={this.state.currentColorIndex}
              color={this.state.randomColors}
              deleteEvent={this.deleteEvent}
              editEvent={this.editEvent}
              saveEventChanges={this.saveEventChanges}
              input={this.state.input}
              updateInput={this.updateInput}
            />
          ))}
        </div>

        <Form
          days={this.state.weekdays}
          selectDay={e => this.selectDay(e)}
          uploadEvent={this.uploadEvent}
          updateInput={e => this.updateInput(e.target)}
          input={this.state.input}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
