export class NotificacaoErro {
  key: string;
  message: string;
}

export class NotificacaoMensagem {
  key: string;
  message: string;
  type: string;
}

export class NotificationResult {
  isValid: boolean;
  errors: NotificacaoErro[];
  messages: NotificacaoMensagem[];
  data: any;
}
