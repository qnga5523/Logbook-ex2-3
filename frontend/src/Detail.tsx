import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;  
}

interface Props {
  task: Task;
  onComplete: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string, newDescription?: string) => void;
}

const TaskDetail: React.FC<Props> = ({ task, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description || '');

  const handleSave = () => {
    if (!newTitle.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }
    onEdit(newTitle, newDescription);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Edit Title"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Edit Description"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name="save" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Text style={styles.date}>
            {new Date(task.createdAt).toLocaleString()} {}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
              <Icon
                name={task.completed ? 'check-circle' : 'circle-o'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 15,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#607D8B',
    paddingVertical: 12,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 12,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
  },
});

export default TaskDetail;
