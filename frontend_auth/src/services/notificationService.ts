// src/services/notificationService.ts
export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('이 브라우저는 알림을 지원하지 않습니다.');
      return false;
    }
  
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };
  
  export const sendNotification = (title: string, body: string) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      console.log('알림 권한이 없거나 브라우저에서 알림을 지원하지 않습니다.');
      return;
    }
  
    const notification = new Notification(title, {
      body,
      icon: '/logo192.png', // 앱 로고 경로 (필요시 수정)
    });
  
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  };
  
  // 알람 체크 및 알림 전송
  export const scheduleNotifications = (alarms: Date[]) => {
    const now = new Date();
  
    alarms.forEach((alarm) => {
      const timeDiff = alarm.getTime() - now.getTime();
  
      if (timeDiff > 0) {
        setTimeout(() => {
          sendNotification(
            '스쿼트 챌린지 시간!',
            '10번의 스쿼트를 할 시간입니다. 지금 바로 시작하세요!'
          );
        }, timeDiff);
      }
    });
  };
  
  // 하루 랜덤 알람 생성
  export const generateRandomAlarms = (): Date[] => {
    const today = new Date();
    const alarms: Date[] = [];
    
    // 오전 10시부터 오후 8시까지의 시간 범위
    const startHour = 10;
    const endHour = 20;
  
    for (let i = 0; i < 3; i++) {
      const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
      const randomMinute = Math.floor(Math.random() * 60);
  
      const alarmTime = new Date(today);
      alarmTime.setHours(randomHour, randomMinute, 0, 0);
  
      alarms.push(alarmTime);
    }
  
    return alarms.sort((a, b) => a.getTime() - b.getTime());
  };
  