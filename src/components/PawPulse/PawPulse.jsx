import { useEffect, useMemo, useState } from "react";
import "./PawPulse.css";
import pawPulseData from "../../data/pawPulse.json";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const createEmptyRoutine = () =>
  DAYS.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

export default function PawPulse({ pet }) {
  const [showRoutine, setShowRoutine] = useState(false);

  const petKey =
    pet?.id ||
    pet?.name?.toLowerCase().replace(/\s+/g, "-") ||
    "default-pet";

  const storageKey = `pawpulse-routine-${petKey}`;

  const [routine, setRoutine] = useState(createEmptyRoutine);

  useEffect(() => {
    const savedRoutine = localStorage.getItem(storageKey);

    if (savedRoutine) {
      setRoutine(JSON.parse(savedRoutine));
    } else {
      setRoutine(createEmptyRoutine());
    }
  }, [storageKey]);

  const saveRoutine = (newRoutine) => {
    setRoutine(newRoutine);
    localStorage.setItem(storageKey, JSON.stringify(newRoutine));
  };

  const totalTasks = useMemo(() => {
    return Object.values(routine).flat().length;
  }, [routine]);

  const completedTasks = useMemo(() => {
    return Object.values(routine)
      .flat()
      .filter((task) => task.completed).length;
  }, [routine]);

  const percentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const remark =
    pawPulseData.percentageRemarks.find(
      (item) =>
        percentage >= item.min &&
        percentage <= item.max
    ) || pawPulseData.percentageRemarks[0];

  if (showRoutine) {
    return (
      <RoutineBuilder
        pet={pet}
        routine={routine}
        saveRoutine={saveRoutine}
        onBack={() => setShowRoutine(false)}
      />
    );
  }

  return (
    <main className="pawpulse-page">

      <section className="pawpulse-intro">

        <div className="pawpulse-heading">

          <span className="pawpulse-eyebrow">
            PAWPULSE
          </span>

          <h1>
            Meet your pet's care pulse.
          </h1>

          <p>
            A simple visual journey that helps you
            understand your pet's care routine at a glance.
          </p>

        </div>

        <div className="pawpulse-pet-card">

          <div className="pawpulse-pet-image">
            {pet?.image ? (
              <img
                src={pet.image}
                alt={pet?.name || "Pet"}
              />
            ) : (
              <i className="bi bi-heart-fill" />
            )}
          </div>

          <div className="pawpulse-pet-info">

            <span>YOUR PET</span>

            <h2>
              {pet?.name || "Your Pet"}
            </h2>

            <p>
              {pet?.breed || "Pet"}{" "}
              {pet?.age ? `• ${pet.age}` : ""}
            </p>

            {pet?.weight && (
              <small>
                {pet.weight} kg
              </small>
            )}

          </div>

        </div>

      </section>


      <section className="pawpulse-score-section">

        <div className="pulse-score-card">

          <div className="pulse-icon">
            <i className="bi bi-heart-pulse-fill" />
          </div>

          <div>
            <span>CARE PULSE</span>

            <strong>
              {percentage}%
            </strong>

            <p>
              {remark.title}
            </p>
          </div>

        </div>

        <div className="pulse-message">

          <i className="bi bi-stars" />

          <div>
            <h3>
              {pet?.name || "Your pet"}'s care insight
            </h3>

            <p>
              {remark.message}
            </p>
          </div>

        </div>

      </section>


      <section className="next-action-card">

        <div className="next-action-icon">
          <i className="bi bi-lightbulb-fill" />
        </div>

        <div className="next-action-content">

          <span>
            NEXT BEST ACTION
          </span>

          <h2>
            {pet?.name || "Your pet"}'s personalized care routine
          </h2>

          <p>
            Build a routine for every day of the week
            and keep track of completed care activities.
          </p>

        </div>

        <button
          className="primary-care-button"
          onClick={() => setShowRoutine(true)}
        >
          <i className="bi bi-calendar2-plus" />
          Customize Care Routine
        </button>

      </section>


      <section className="weekly-overview">

        <div className="section-title">

          <div>
            <span>WEEKLY JOURNEY</span>

            <h2>
              {pet?.name || "Your pet"}'s care week
            </h2>
          </div>

          <span className="task-count">
            {completedTasks}/{totalTasks} completed
          </span>

        </div>


        <div className="week-grid">

          {DAYS.map((day) => {

            const tasks = routine[day] || [];

            const completed = tasks.filter(
              (task) => task.completed
            ).length;

            return (
              <div
                className={`day-card ${
                  tasks.length === 0 ? "empty" : ""
                }`}
                key={day}
              >

                <div className="day-header">

                  <span>
                    {day.slice(0, 3)}
                  </span>

                  <div className="day-circle">
                    {tasks.length === 0
                      ? "—"
                      : `${completed}/${tasks.length}`}
                  </div>

                </div>

                {tasks.length === 0 ? (
                  <p className="empty-day">
                    No care planned
                  </p>
                ) : (
                  tasks.map((task) => (
                    <div
                      className={`mini-task ${
                        task.completed ? "done" : ""
                      }`}
                      key={task.id}
                    >
                      <i className={`bi ${task.icon}`} />

                      <span>
                        {task.label}
                      </span>
                    </div>
                  ))
                )}

              </div>
            );
          })}

        </div>

      </section>


      <section className="care-remark">

        <i className="bi bi-chat-heart-fill" />

        <div>
          <strong>
            PawPulse says:
          </strong>

          <p>
            {remark.message}
          </p>
        </div>

      </section>

    </main>
  );
}


/* =========================
   ROUTINE BUILDER
========================= */

function RoutineBuilder({
  pet,
  routine,
  saveRoutine,
  onBack
}) {
  const [selectedDay, setSelectedDay] =
    useState("Monday");

  const [selectedCare, setSelectedCare] =
    useState(null);

  const [dueDate, setDueDate] =
    useState("");

  const addCare = () => {

    if (!selectedCare) return;

    const care = pawPulseData.careOptions.find(
      (item) => item.id === selectedCare
    );

    if (!care) return;

    const newTask = {
      id: `${selectedDay}-${Date.now()}`,
      label: care.label,
      icon: care.icon,
      dueDate: dueDate || "",
      completed: false
    };

    const updatedRoutine = {
      ...routine,
      [selectedDay]: [
        ...(routine[selectedDay] || []),
        newTask
      ]
    };

    saveRoutine(updatedRoutine);

    setSelectedCare(null);
    setDueDate("");
  };


  const toggleComplete = (day, taskId) => {

    const updatedRoutine = {
      ...routine,
      [day]: routine[day].map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    };

    saveRoutine(updatedRoutine);
  };


  const removeTask = (day, taskId) => {

    const updatedRoutine = {
      ...routine,
      [day]: routine[day].filter(
        (task) => task.id !== taskId
      )
    };

    saveRoutine(updatedRoutine);
  };


  return (
    <main className="routine-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <i className="bi bi-arrow-left" />
        Back to PawPulse
      </button>


      <header className="routine-header">

        <span>
          CUSTOM CARE ROUTINE
        </span>

        <h1>
          {pet?.name || "Your pet"}'s weekly routine
        </h1>

        <p>
          Choose care activities for each day.
          No typing required.
        </p>

      </header>


      <section className="routine-builder">

        <div className="day-selector">

          <h3>
            Choose a day
          </h3>

          <div className="day-buttons">

            {DAYS.map((day) => (
              <button
                key={day}
                className={
                  selectedDay === day
                    ? "active"
                    : ""
                }
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}

          </div>

        </div>


        <div className="care-picker">

          <h3>
            What care does {pet?.name || "your pet"} need?
          </h3>

          <div className="care-options">

            {pawPulseData.careOptions.map(
              (care) => (
                <button
                  key={care.id}
                  className={
                    selectedCare === care.id
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCare(care.id)
                  }
                >
                  <i
                    className={`bi ${care.icon}`}
                  />

                  <span>
                    {care.label}
                  </span>
                </button>
              )
            )}

          </div>

        </div>


        <div className="due-date-box">

          <label>
            Due date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <button
            className="add-care-button"
            onClick={addCare}
            disabled={!selectedCare}
          >
            <i className="bi bi-plus-circle" />
            Add to {selectedDay}
          </button>

        </div>

      </section>


      <section className="routine-list">

        <div className="routine-list-heading">

          <span>
            YOUR ROUTINE
          </span>

          <h2>
            Weekly care plan
          </h2>

        </div>


        {DAYS.map((day) => {

          const tasks = routine[day] || [];

          return (
            <div
              className="routine-day"
              key={day}
            >

              <div className="routine-day-title">

                <div>
                  <span>
                    {day}
                  </span>

                  <small>
                    {tasks.length} activities
                  </small>
                </div>

              </div>


              {tasks.length === 0 ? (
                <p className="no-task">
                  Nothing scheduled yet.
                </p>
              ) : (
                <div className="routine-tasks">

                  {tasks.map((task) => (

                    <div
                      className={`routine-task ${
                        task.completed
                          ? "completed"
                          : ""
                      }`}
                      key={task.id}
                    >

                      <div className="routine-task-icon">
                        <i
                          className={`bi ${task.icon}`}
                        />
                      </div>

                      <div className="routine-task-info">

                        <strong>
                          {task.label}
                        </strong>

                        {task.dueDate && (
                          <small>
                            Due: {task.dueDate}
                          </small>
                        )}

                      </div>


                      <button
                        className="complete-button"
                        onClick={() =>
                          toggleComplete(
                            day,
                            task.id
                          )
                        }
                      >
                        <i
                          className={
                            task.completed
                              ? "bi bi-check-circle-fill"
                              : "bi bi-circle"
                          }
                        />

                        {task.completed
                          ? "Completed"
                          : "Mark Done"}
                      </button>


                      <button
                        className="remove-button"
                        onClick={() =>
                          removeTask(
                            day,
                            task.id
                          )
                        }
                        aria-label="Remove task"
                      >
                        <i className="bi bi-trash3" />
                      </button>

                    </div>

                  ))}

                </div>
              )}

            </div>
          );
        })}

      </section>

    </main>
  );
}