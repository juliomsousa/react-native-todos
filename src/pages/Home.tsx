import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task } from '../components/TaskItem';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const isRepeatedTask = tasks.some(({ title }) => {
      return title.toLocaleLowerCase() === newTaskTitle.toLocaleLowerCase();
    });

    if (isRepeatedTask) {
      existingItemAlert();
      return;
    }

    setTasks((prevState) => [...prevState, newTask]);
  }

  const existingItemAlert = () => {
    Alert.alert(
      'Task já cadastrada',
      'Você não pode cadastrar uma task com o mesmo nome'
    );
  };

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      const toggled = task.id === id ? !task.done : task.done;
      return {
        ...task,
        done: toggled,
      };
    });

    setTasks(updatedTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const isRepeatedTask = tasks.some(({ title }) => {
      return title.toLocaleLowerCase() === taskNewTitle.toLocaleLowerCase();
    });

    if (isRepeatedTask) {
      existingItemAlert();
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: () => removeTask(id),
        },
      ]
    );
  }

  function removeTask(id: number) {
    const reamainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(reamainingTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
