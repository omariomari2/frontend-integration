import { notificationsData } from '@/data/notificationsData';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const NotificationsScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const styles = createStyles(isDark);

  const [notifications, setNotifications] = useState(notificationsData);

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const NotificationItem = ({ notification }) => {
    const pan = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const [isDeleting, setIsDeleting] = useState(false);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderGrant: () => {
        // Do nothing on grant
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow left swipe (negative values)
        if (gestureState.dx <= 0) {
          pan.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -80) {
          // Delete threshold reached
          setIsDeleting(true);
          Animated.parallel([
            Animated.timing(pan, {
              toValue: -400,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            })
          ]).start(() => {
            deleteNotification(notification.id);
          });
        } else {
          // Snap back to original position
          Animated.spring(pan, {
            toValue: 0,
            tension: 100,
            friction: 8,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderTerminationRequest: () => false,
    });

    const navigateToDetail = () => {
      if (!isDeleting && pan._value === 0) {
        router.push(`/notifications/${notification.id}`);
      }
    };

    return (
      <View style={styles.notificationWrapper}>
        <View style={styles.deleteBackground}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
        <Animated.View
          style={[
            styles.notificationItem,
            { 
              transform: [{ translateX: pan }],
              opacity: opacity
            }
          ]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity 
            style={styles.notificationContent} 
            onPress={navigateToDetail}
            activeOpacity={0.7}
            disabled={isDeleting}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{notification.icon}</Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{notification.title}</Text>
                <View style={styles.timeRow}>
                  {notification.hasUnread && <View style={styles.unreadDot} />}
                  <Text style={styles.time}>{notification.time}</Text>
                </View>
              </View>
              {notification.message && (
                <Text style={styles.message} numberOfLines={3}>
                  {notification.message}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={styles.container.backgroundColor}
      />
      
      {/* Header with ChevronLeft */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={isDark ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholderButton} />
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#171717' : '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#e5e5e5',
    
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: isDark ? '#ffffff' : '#000000',
  },
  placeholderButton: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  notificationWrapper: {
    position: 'relative',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  notificationItem: {
    backgroundColor: isDark ? '#171717' : '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#f0f0f0',
    zIndex: 2,
  },
  notificationContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: isDark ? '#333333' : '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: isDark ? '#ffffff' : '#000000',
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    marginRight: 6,
  },
  time: {
    fontSize: 14,
    color: isDark ? '#999999' : '#666666',
  },
  message: {
    fontSize: 14,
    color: isDark ? '#cccccc' : '#333333',
    lineHeight: 20,
    marginTop: 2,
  },
});

export default NotificationsScreen;