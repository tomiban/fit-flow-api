import { v4 as uuid } from "uuid";

const getAllRoutines = () => {
  const allRoutines = Rutinas.getAllRoutinesDb();
  return allRoutines;
};
const getRoutineById = (routineId) => {
  const routine = Rutinas.getRoutineById(routineId);
  return routine;
};
const createNewRoutine = (routine) => {
  const newRoutine = {
    ...routine,
  };

  const createdRoutine = Rutinas.createNewRoutine(newRoutine);
  return createdRoutine;
};

const updateRoutine = (routineId, changes) => {
  const updatedRoutine = Rutinas.updateRoutine(routineId, changes);
  return updatedRoutine;
};
const deleteRoutine = (routineId) => {
  return Rutinas.deleteRoutine(routineId);
};

export default {
  getAllRoutines,
  getRoutineById,
  createNewRoutine,
  updateRoutine,
  deleteRoutine,
};
