export type TUser = {
  id: string;
  type: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  fcmToken: string;
};

export type NotificationType = 'promo' | 'transaction' | 'message';

export type TNotification = {
  type: NotificationType;
  id: string;
};
