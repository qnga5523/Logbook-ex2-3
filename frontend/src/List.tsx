import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TaskDetail from './Detail';

interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface Props {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription?: string) => void;
}

const TodoList: React.FC<Props> = ({ tasks, onComplete, onDelete, onEdit }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {tasks.map((task) => (
          <TaskDetail
            key={task._id}
            task={task}
            onComplete={() => onComplete(task._id!)}
            onDelete={() => onDelete(task._id!)}
            onEdit={(newTitle, newDescription) => onEdit(task._id!, newTitle, newDescription)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    backgroundColor: '#f0f0f0', 
  },
  container: {
    padding: 15, 
    borderRadius: 10, 
    backgroundColor: '#ffffff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, 
  },
});

export default TodoList;
