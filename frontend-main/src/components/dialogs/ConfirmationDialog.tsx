import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { H5, Body1 } from '../ui/Typography';
import { useTheme } from '../../hooks/useTheme';

interface ConfirmationDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'danger' | 'warning' | 'success';
}

export function ConfirmationDialog({
  visible,
  onDismiss,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default',
}: ConfirmationDialogProps) {
  const { colors } = useTheme();
  
  const getButtonVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      position="center"
      animationType="fade"
      backdropOpacity={0.7}
    >
      <View style={styles.container}>
        <H5 style={styles.title}>{title}</H5>
        <Body1 style={styles.message}>{message}</Body1>
        
        <View style={styles.buttonsContainer}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              variant="outline"
              onPress={onDismiss}
              style={styles.button}
            >
              {cancelText}
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              variant={getButtonVariant()}
              onPress={() => {
                onConfirm();
                onDismiss();
              }}
              style={styles.button}
            >
              {confirmText}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});
