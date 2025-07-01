import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../src/components/ui/Button';
import { ConfirmationDialog } from '../../src/components/dialogs/ConfirmationDialog';
import { useToast } from '../../src/contexts/ToastContext';
import { useModal } from '../../src/hooks/useModal';
import { Modal } from '../../src/components/ui/Modal';
import { Card } from '../../src/components/ui/Card';
import { H4, Body1 } from '../../src/components/ui/Typography';

export function ComponentDemoScreen() {
  const { showToast } = useToast();
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState<'default' | 'danger' | 'warning' | 'success'>('default');
  
  const {
    visible: modalVisible,
    show: showModal,
    hide: hideModal,
    modalRef,
  } = useModal();

  const showConfirmationDialog = (type: 'default' | 'danger' | 'warning' | 'success') => {
    setDialogType(type);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    let toastType: 'success' | 'warning' | 'error' | 'info';
    if (dialogType === 'danger') toastType = 'error';
    else if (dialogType === 'success') toastType = 'success';
    else if (dialogType === 'warning') toastType = 'warning';
    else toastType = 'info';
    showToast(`Action confirmed (${dialogType})`, { type: toastType });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <H4 style={styles.sectionTitle}>Modal Examples</H4>
      
      <View style={styles.buttonGroup}>
        <Button onPress={showModal} style={styles.button}>
          Show Basic Modal
        </Button>
        
        <Button 
          onPress={() => setVisible(true)} 
          variant="outline" 
          style={styles.button}
        >
          Show Custom Modal
        </Button>
      </View>

      <H4 style={styles.sectionTitle}>Confirmation Dialogs</H4>
      <View style={styles.buttonGroup}>
        <Button 
          onPress={() => showConfirmationDialog('default')} 
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Default Dialog
        </Button>
        <Button 
          onPress={() => showConfirmationDialog('danger')} 
          variant="danger"
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Danger Dialog
        </Button>
        <Button 
          onPress={() => showConfirmationDialog('warning')} 
          variant="warning"
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Warning Dialog
        </Button>
        <Button 
          onPress={() => showConfirmationDialog('success')} 
          variant="success"
          style={styles.button}
        >
          Success Dialog
        </Button>
      </View>

      <H4 style={styles.sectionTitle}>Toast Notifications</H4>
      <View style={styles.buttonGroup}>
        <Button 
          onPress={() => showToast('This is an info message', { type: 'info' })}
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Show Info Toast
        </Button>
        <Button 
          onPress={() => showToast('Something went wrong!', { type: 'error' })}
          variant="danger"
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Show Error Toast
        </Button>
        <Button 
          onPress={() => showToast('Warning: Action required', { type: 'warning' })}
          variant="warning"
          style={[styles.button, { marginBottom: 8 }] as any}
        >
          Show Warning Toast
        </Button>
        <Button 
          onPress={() => showToast('Action completed successfully!', { 
            type: 'success',
            action: {
              label: 'UNDO',
              onPress: () => showToast('Action undone!', { type: 'info' })
            }
          })}
          variant="success"
          style={styles.button}
        >
          Show Success Toast with Action
        </Button>
      </View>

      {/* Basic Modal */}
      <Modal
        ref={modalRef}
        visible={modalVisible}
        onDismiss={hideModal}
        position="center"
        animationType="fade"
      >
        <Card variant="elevated">
          <Card.Header>
            <H4>Basic Modal</H4>
          </Card.Header>
          <Card.Body>
            <Body1>This is a basic modal with a card inside.</Body1>
          </Card.Body>
          <Card.Footer style={styles.modalFooter}>
            <Button onPress={hideModal} variant="outline" style={styles.button}>
              Close
            </Button>
          </Card.Footer>
        </Card>
      </Modal>

      {/* Custom Modal */}
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        position="bottom"
        animationType="slide"
        backdropOpacity={0.5}
      >
        <View style={styles.customModal}>
          <View style={styles.modalHandle} />
          <H4 style={styles.modalTitle}>Custom Modal</H4>
          <Body1 style={styles.modalText}>
            This is a custom modal with a bottom sheet style.
            You can add any content here.
          </Body1>
          <Button 
            onPress={() => setVisible(false)}
            variant="primary"
            style={styles.fullWidthButton}
          >
            Got it!
          </Button>
        </View>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onConfirm={handleConfirm}
        title={
          dialogType === 'danger' ? 'Confirm Action' :
          dialogType === 'warning' ? 'Warning' :
          dialogType === 'success' ? 'Success' : 'Confirmation'
        }
        message={
          dialogType === 'danger' ? 'Are you sure you want to delete this item? This action cannot be undone.' :
          dialogType === 'warning' ? 'This action might have some side effects. Do you want to continue?' :
          dialogType === 'success' ? 'Your action was successful! What would you like to do next?' :
          'Are you sure you want to perform this action?'
        }
        confirmText={
          dialogType === 'danger' ? 'Delete' :
          dialogType === 'warning' ? 'Continue' :
          dialogType === 'success' ? 'Great!' : 'Confirm'
        }
        type={dialogType}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 8,
  },
  fullWidthButton: {
    width: '100%',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  customModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
});

export default ComponentDemoScreen;
