export default interface Translations {
  commands: {
    language: {
      response: string;
    };
    ping: {
      title: string;
      fields: [
        {
          name: string;
          value: string;
        }
      ];
    };
  };
  events: {
    clientMissingPermissions: {
      response: string;
    };
    userMissingPermissions: {
      response: string;
    };
  };
  interactions: {
    templateBtns: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
    };
    templateModal: {
      response: string;
    };
    templateSltMns: {
      first_option: string;
      second_option: string;
    };
  };
  utils: {};
}
