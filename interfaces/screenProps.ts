// Props Start Screen
export interface StartScreenProps {
  onExit: () => void;
}

// Props Select Screen
export interface SelectScreenProps {
  toRegister: () => void;
  toLogin: () => void;
}

// Props Register Screen
export interface RegisterScreenProps {
  onBack: () => void;
}

// Props Login Screen
export interface LoginScreenProps {
  onBack: () => void;
}
