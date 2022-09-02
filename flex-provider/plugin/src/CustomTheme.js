export const twilioRed = "#F22F46";
export const twilioWhite = "#FFFFFF";
export const twilioBlue = "#001489";
export const lightGray = "#e6e6e6";
export const lightGray2 = '#F2F2F5';
export const middleGray = '#8A91A8';
export const darkGray = "#666666";
export const darkGray2 = '#3C4760';
export const darkGray3 = '#4B5671';
export const black = "#000";
export const blue = "#0066b2";
export const teal = "#057d9e";
export const tealHover = "#02627c";
export const colorTextWeak = '#606B85';
export const brandColor = "#F4F4F6";
export const msgInputBgColor = "#0263E0";
export const brandTextColor2 = "#121C2D";

function brandMessageBubbleColors(bgBubbleColor, bubbleColor) {
  return {
    Avatar: {
      backgroundColor: bgBubbleColor,
      color: bubbleColor
    },
    Bubble: {
      backgroundColor: bgBubbleColor,
      color: bubbleColor,
      fontFamily: "'Inter', sans-serif"
    },
    Header: {
      color: bubbleColor,
      fontFamily: "'Inter', sans-serif"
    }
  }
}

export const CustomTheme = {
  baseName: "FlexLight",
  colors: {
      base1: twilioWhite,
      base3: lightGray,
      base0: twilioRed,
      tabSelectedColor: msgInputBgColor,
  }
};

export const componentThemeOverrides = {
  MainHeader: {
    Container: {
      background: twilioWhite,
      color: darkGray,
      fontFamily: "'Inter', sans-serif"
    },
  },
  TaskList: {
    Filter: {
      Menu: {
        Item: {
          background: lightGray2
        },
      },
      Container: {
        background: lightGray2
      },
    },
    Item: {
      Container: {
        background: lightGray2,
        //borderRadius: '8px',
      },
      SelectedContainer: {
        background: darkGray2,
        borderRadius: '8px',
        color: twilioWhite,
        borderBottom: 'none'
      },
    }
  },
  Chat: {
    MessageListItem: {
      FromMe: brandMessageBubbleColors(darkGray3, twilioWhite),
      FromOthers: brandMessageBubbleColors(brandColor, brandTextColor2),
    },
  },
  WorkerDirectory: {
    Container: {
      background: twilioWhite,
      border: '1px solid #E1E3EA',
      boxShadow: '0px 16px 24px 4px rgba(18, 28, 45, 0.2)',
      borderRadius: '8px',
      width: '350px',
      height: '303px',
      fontFamily: "'Inter', sans-serif"
      //marginTop: '334px'
    },
  },
};

