import { injectGlobal } from '@emotion/css';

injectGlobal`
  @font-face {
    font-family: "Inter";
    src: url('https://fonts.googleapis.com/css?family=Inter');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  .Twilio-TaskCanvasHeader-default,
  .Twilio-TabHeader,
  .Twilio-IncomingTaskCanvas {
    font-family: 'Inter', sans-serif;
  }
	.Twilio-MainHeader-default > div > svg {
	  display: none;
  }
  .Twilio-MainHeader-default > div:nth-child(1):after {
    content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 457.99 31.22'%3E%3Cdefs%3E%3Cstyle%3E.d%7Bletter-spacing:.1em;%7D.e%7Bletter-spacing:.1em;%7D.f%7Bletter-spacing:0em;%7D.g,.h%7Bfill:%23fff;%7D.i%7Bletter-spacing:.06em;%7D.h%7Bfont-family:Geograph-Bold, Geograph;font-size:27.74px;%7D%3C/style%3E%3C/defs%3E%3Cg id='a'/%3E%3Cg id='b'%3E%3Cg id='c'%3E%3Cg%3E%3Ctext class='h' transform='translate(46.37 24.35)'%3E%3Ctspan class='e' x='0' y='0'%3EC%3C/tspan%3E%3Ctspan class='i' x='20.5' y='0'%3EL%3C/tspan%3E%3Ctspan class='e' x='37.25' y='0'%3EOUD CITY HEA%3C/tspan%3E%3Ctspan class='f' x='266.92' y='0'%3EL%3C/tspan%3E%3Ctspan class='d' x='282.09' y='0'%3ETHCARE%3C/tspan%3E%3C/text%3E%3Cg%3E%3Cpath class='g' d='M29.37,9.25V3.7C29.37,1.66,27.72,0,25.67,0h-5.55C18.09,0,16.43,1.66,16.43,3.7V12.48c0,.26,.21,.46,.46,.46h8.78c2.04,0,3.7-1.66,3.7-3.7Z'/%3E%3Cpath class='g' d='M16.43,17.1v8.78c0,2.04,1.66,3.7,3.7,3.7h5.55c2.04,0,3.7-1.66,3.7-3.7v-5.55c0-2.04-1.66-3.7-3.7-3.7h-8.78c-.26,0-.46,.21-.46,.46Z'/%3E%3Cpath class='g' d='M0,20.34v5.55c0,2.04,1.66,3.7,3.7,3.7h5.55c2.04,0,3.7-1.66,3.7-3.7v-8.78c0-.26-.21-.46-.46-.46H3.7C1.66,16.64,0,18.3,0,20.34Z'/%3E%3Cpath class='g' d='M12.94,12.48V3.7C12.94,1.66,11.29,0,9.25,0H3.7C1.66,0,0,1.66,0,3.7v5.55c0,2.04,1.66,3.7,3.7,3.7H12.48c.26,0,.46-.21,.46-.46Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    width: 210px;
    margin-top: 3px;
  }

  .Twilio-Splitter-Pane,
  .Twilio-AgentDesktopView-default > div > div:nth-child(1) > div,
  .Twilio-AgentDesktopView-default > div > div:nth-child(1) > div > div.Twilio-AgentDesktopView\.Panel1-default,
  .Twilio-AgentDesktopView-default > div > div:nth-child(1) > div > div.Twilio-AgentDesktopView\.Panel1-default > div.Twilio-Splitter.Twilio-Splitter-Vertical{
    overflow: visible!important;
  }
  
  /*TASK LIST & TASK ITEM*/

  .Twilio-TaskListBaseItem {
    margin: 1px 4px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
	  //background: #F2F2F5;
	  border-radius: 8px;
  }

  .Twilio-TaskListBaseItem .Twilio-Badge-OuterCircle {
	  z-index: 0;
  }

  .Twilio-TaskListBaseItem:hover {
    background: #3C4760;
	  color: white;
  }
  
  .Twilio-TaskListBaseItem::before {
	  content: none;
  }
  
  .Twilio-TaskListBaseItem-Content {
    /* border-bottom: 1px solid #E1E3E9;*/
  }
  .Twilio-TaskListBaseItem-FirstLine {
	  font-size: 14px;
  }
  .Twilio-TaskListBaseItem-SecondLine {
    font-size: 12px;
  }

  .Twilio-TaskListBaseItem-IconAreaContainer {
    background: none!important;
  }
  .Twilio-TaskListBaseItem-IconAreaContainer svg,
  .Twilio-TaskListBaseItem-IconAreaContainer > button {
    display: none;
  }

  .Twilio-TaskListBaseItem-IconAreaContainer::before {
    content: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='30' height='30' rx='15' fill='%238A91A8'/%3E%3Cpath d='M23.5 18H23V16.5C23 16.1022 22.842 15.7206 22.5607 15.4393C22.2794 15.158 21.8978 15 21.5 15H16.5C16.1022 15 15.7206 15.158 15.4393 15.4393C15.158 15.7206 15 16.1022 15 16.5V22.5C15.0005 22.5987 15.0302 22.6951 15.0854 22.7769C15.1405 22.8588 15.2187 22.9225 15.31 22.96C15.3693 22.988 15.4344 23.0017 15.5 23C15.5658 23.0004 15.631 22.9878 15.692 22.9629C15.7529 22.938 15.8083 22.9013 15.855 22.855L17.26 21.445H18V22.165C18 22.5628 18.158 22.9444 18.4393 23.2257C18.7206 23.507 19.1022 23.665 19.5 23.665H22.96L24.145 24.855C24.1917 24.9013 24.2471 24.938 24.308 24.9629C24.369 24.9878 24.4342 25.0004 24.5 25C24.5656 25.0017 24.6307 24.988 24.69 24.96C24.7813 24.9225 24.8595 24.8588 24.9146 24.7769C24.9698 24.6951 24.9995 24.5987 25 24.5V19.5C25 19.1022 24.842 18.7206 24.5607 18.4393C24.2794 18.158 23.8978 18 23.5 18ZM18 19.5V20.445H17.055C16.9892 20.4446 16.924 20.4572 16.863 20.4821C16.8021 20.507 16.7467 20.5437 16.7 20.59L16 21.295V16.5C16 16.3674 16.0527 16.2402 16.1464 16.1464C16.2402 16.0527 16.3674 16 16.5 16H21.5C21.6326 16 21.7598 16.0527 21.8536 16.1464C21.9473 16.2402 22 16.3674 22 16.5V18H19.5C19.1022 18 18.7206 18.158 18.4393 18.4393C18.158 18.7206 18 19.1022 18 19.5ZM24 23.295L23.5 22.795C23.4537 22.7478 23.3985 22.7102 23.3375 22.6844C23.2766 22.6587 23.2112 22.6453 23.145 22.645H19.5C19.3674 22.645 19.2402 22.5923 19.1464 22.4986C19.0527 22.4048 19 22.2776 19 22.145V19.5C19 19.3674 19.0527 19.2402 19.1464 19.1464C19.2402 19.0527 19.3674 19 19.5 19H23.5C23.6326 19 23.7598 19.0527 23.8536 19.1464C23.9473 19.2402 24 19.3674 24 19.5V23.295Z' fill='white'/%3E%3C/svg%3E");
    width: 40px;
    height: 40px;
  }
  
  /*CHAT*/

  .Twilio-WelcomeMessage {
    color:#606B85 !important;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  .Twilio-TaskCanvas-default > .Twilio-TaskCanvasTabs > .Twilio-Tabs-Labels {
	  display: flex;
	  justify-content: center;
  }

  .Twilio-TaskCanvas-default > .Twilio-TaskCanvasTabs > .Twilio-Tabs-Labels > div > button > span {
    text-transform: uppercase;
    font-size: 12px;
  }

  .Twilio-TaskCanvas-default > .Twilio-TaskCanvasHeader > .Twilio-TaskCanvasHeader-default > .Twilio-TaskCanvasHeader-EndButton {
    padding: 6px 10px;
		gap: 6px;
		background: #FF0000;
	  color: white;
    font-family: 'Inter', sans-serif;
		font-size: 13px;
    border-radius: 39px;
		height: 28px;
		width: 84px;
    text-transform: capitalize;
	  font-weight: bold;
  }

  .Twilio-InlineMessage {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  .Twilio-WelcomeMessage-IconContainer {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  .Twilio-WelcomeMessage-IconContainer svg {
    display: none;
  }

  .Twilio-MessageBubble {
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px !important;
  }

  .Twilio-MessageBubble-Time {
    color: #a6abb7;
  }

  .Twilio-MessageBubble-Header div {
    font-size: 13px !important;
  }

  .Twilio-MessageBubble-Body {
    font-size: 14px !important;
  }

  .Twilio-MessageListItem-BubbleContainer {
    min-width: 230px !important;
  }

  .Twilio-MessageListItem {
    margin-top: 12px !important;
  }

  .generatedAnswers {
    width: 100% !important;
    max-width: 280px;
  }

  .generatedAnswerBubble {
    background: #EBF4FF !important;
    border-radius: 8px !important;
    color: #0263E0 !important;
    padding: 12px 12px !important;
    font-weight: 600;
  }

  .Twilio-MessageInput div, textarea {
    font-size: 14px !important;
  }

  .Twilio-MessageInputV2 > .Twilio-MessageInputV2-default > div {
	  border: none;
  }

  .Twilio-MessageInputArea-TextArea {
    min-height: 44px;
    font-family: 'Inter', sans-serif;
    border-radius: 28px !important;
    background: #F4F4F6;
    border: 1px solid #E1E3EA;
  }

  .Twilio-MessageInputArea-TextArea textarea {
    padding-top: 12px;
    padding-left: 16px;
  }

  /*for FLEX 1.31*/
  .Twilio-MessageInput-SendButton {
    height: 44px !important;
    width: 44px !important;
  }
  
  .Twilio-MessageInputV2-default > .Twilio-MessageInputActions > .Twilio-MessageInputActions-end > button{
    height: 44px !important;
    width: 44px !important;
    min-width: 44px !important;
	  border-radius: 50% !important;
  }

  .Twilio-MessageInput-SendButton:disabled,
  .Twilio-MessageInputV2-default > .Twilio-MessageInputActions > .Twilio-MessageInputActions-end > button:disabled{
    opacity: 1 !important;
  }

  .Twilio-MessageInputV2-default > .Twilio-MessageInputActions > .Twilio-MessageInputActions-end > button > span {
	  display: none
  }
  
  .Twilio-MessageInputV2-default > .Twilio-MessageInputActions > .Twilio-MessageInputActions-end > button::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' class='Twilio-Icon-Content'%3E%3Cpath d='M19.641 4c.164 0 .27.064.317.193.047.13.023.305-.07.528l-7.19 16.77a.761.761 0 01-.237.36.501.501 0 01-.308.114.494.494 0 01-.281-.097.989.989 0 01-.264-.29L8.76 16.92a4.609 4.609 0 00-.73-.905 5.269 5.269 0 00-.904-.747L2.38 12.314c-.27-.175-.396-.372-.378-.588.017-.217.172-.39.465-.519l16.788-7.12c.07-.023.137-.043.202-.06A.701.701 0 0119.64 4zM7.723 14.266c.117.07.238.155.36.255.124.1.25.208.379.325l8.314-8.455-12.902 5.484 3.85 2.39zm4.342 5.818l5.52-12.92-8.332 8.473c.105.117.202.234.29.351.088.117.16.235.22.352l2.302 3.744z' fill='white' stroke='none' stroke-width='1' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
	  width: 24px;
    height: 24px;
  }
  .Twilio-MessagingCanvas > .Twilio-MessagingCanvas-default > .Twilio-MessageInputV2 > .Twilio-MessageInputV2-default {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .Twilio-MessageInputV2 > .Twilio-MessageInputV2-default > div:nth-child(1) {
	  width: 85%;
  }
  
  .Twilio-MessageInputV2 > .Twilio-MessageInputV2-default > div:nth-child(2) {
    width: 15%;
    margin-bottom: 0;
  }
  
  /*WORKER DIRECTORY*/

  .Twilio-WorkerDirectory-Popup {
    width: 350px;
    height: 303px;
    position: absolute;
    top: 303px;
    left: 330px;
  }
  /*.Twilio-WorkerDirectory-Header {
			display: none;
	}*/
  .Twilio-WorkerDirectory-Popup .Twilio-TabHeader button .Twilio {
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    color: #AEB2C1;
    letter-spacing: normal;
  }
  .Twilio-WorkerDirectoryTabs input[type=text]{
    background: #F4F4F6;
    /*border: 1px solid #E1E3EA;
    border-radius: 8px;
    height: 38px;*/
  }

  .Twilio-WorkerDirectory-Workers .Twilio-UserCard-InfoContainer-FirstLine span{
	  font-size: 12px;
    color: #4B5671;
	  font-weight: 600;
  }
  .Twilio-WorkerDirectory-Workers .Twilio-UserCard-InfoContainer-SecondLine span {
	  font-size: 8px;
    text-transform: uppercase;
  }
  .Twilio-WorkerDirectory-Queues > div > .Twilio-WorkerDirectory-QueueContent span{
    font-weight: 600;
    font-size: 12px;
    color: #606B85;
  }
  .Twilio-WorkerDirectory-Workers, .Twilio-WorkerDirectory-Queues {
    padding: 0 12px;
    border: none;
  }
  .Twilio-WorkerDirectory-Worker, .Twilio-WorkerDirectory-Queue {
    border-bottom: 1px solid grey;
    background: #fff;
    margin-top: 2px;
  }
  .Twilio-WorkerDirectory-Worker:hover, .Twilio-WorkerDirectory-Queue:hover {
    background: #EBF4FF;
    opacity: 0.8;
    border-radius: 4px;
    border: none;
  }
  .Twilio-WorkerDirectory-Worker:hover .Twilio-UserCard-InfoContainer-FirstLine span,
  .Twilio-WorkerDirectory-Worker:hover .Twilio-UserCard-InfoContainer-SecondLine span,
  .Twilio-WorkerDirectory-Queue:hover .Twilio-WorkerDirectory-QueueContent span,
  .Twilio-WorkerDirectory-Queue:hover .Twilio-WorkerDirectory-QueueAvatar {
	  color: #0263E0;
  }
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-IconButton {
    background: #CCE4FF;
    width: 24px;
    height: 24px;
    border-radius: 8px;
	  border: none;
  }
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-IconButton:hover {
    background: #0263E0;
    color: white;
  }
  .Twilio-WorkerDirectory-QueueAvatar {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-top: 6px;
    margin-left: 4px;
  }
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Call .Twilio-Icon-Content,
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Transfer .Twilio-Icon-Content {
    display: none;
  }
  
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Call::before {
    content: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.09992 5.41641C8.00825 5.41641 7.91242 5.38724 7.82075 5.36641C7.63512 5.3255 7.4527 5.27119 7.27492 5.20391C7.08162 5.13359 6.86915 5.13724 6.67838 5.21416C6.48762 5.29108 6.33204 5.43584 6.24159 5.62057L6.14992 5.80807C5.74409 5.58232 5.37116 5.30192 5.04159 4.97474C4.71441 4.64517 4.43401 4.27224 4.20825 3.86641L4.38325 3.74974C4.56799 3.65929 4.71275 3.50371 4.78967 3.31295C4.86659 3.12218 4.87024 2.90971 4.79992 2.71641C4.73376 2.53825 4.67948 2.35591 4.63742 2.17058C4.61659 2.07891 4.59992 1.98308 4.58742 1.88724C4.53682 1.59375 4.3831 1.32797 4.15393 1.13776C3.92476 0.947549 3.63521 0.845412 3.33742 0.849742H2.08742C1.90785 0.848056 1.73002 0.885081 1.56605 0.958296C1.40207 1.03151 1.2558 1.1392 1.13718 1.27403C1.01857 1.40885 0.930393 1.56766 0.878665 1.73962C0.826937 1.91159 0.81287 2.09268 0.83742 2.27057C1.05939 4.01615 1.8566 5.63802 3.10311 6.88001C4.34962 8.12199 5.97438 8.91329 7.72075 9.12891H7.87909C8.18634 9.12936 8.483 9.01663 8.71242 8.81224C8.84424 8.69434 8.94954 8.54982 9.02136 8.38821C9.09319 8.2266 9.12991 8.05159 9.12909 7.87474V6.62474C9.12398 6.33532 9.01859 6.05664 8.83089 5.83627C8.6432 5.6159 8.38484 5.4675 8.09992 5.41641ZM8.30825 7.91641C8.30818 7.97557 8.29551 8.03404 8.27108 8.08792C8.24665 8.1418 8.21103 8.18986 8.16659 8.22891C8.12003 8.26911 8.06559 8.29914 8.00675 8.31707C7.94792 8.33501 7.88598 8.34046 7.82492 8.33308C6.26446 8.13299 4.81502 7.41911 3.70522 6.30403C2.59542 5.18895 1.88842 3.73613 1.69575 2.17474C1.68912 2.11371 1.69493 2.05196 1.71284 1.99324C1.73074 1.93451 1.76037 1.88003 1.79992 1.83308C1.83897 1.78863 1.88703 1.75301 1.94091 1.72858C1.99479 1.70416 2.05326 1.69148 2.11242 1.69141H3.36242C3.45931 1.68925 3.55393 1.72094 3.62998 1.78102C3.70603 1.8411 3.75876 1.92581 3.77909 2.02057C3.79575 2.13446 3.81659 2.24696 3.84159 2.35807C3.88972 2.57772 3.95378 2.79357 4.03325 3.00391L3.44992 3.27474C3.40004 3.29763 3.35518 3.33014 3.3179 3.37041C3.28063 3.41068 3.25167 3.45791 3.2327 3.50941C3.21373 3.5609 3.20512 3.61563 3.20736 3.67046C3.2096 3.72529 3.22265 3.77914 3.24575 3.82891C3.84542 5.11339 4.87794 6.14591 6.16242 6.74558C6.26386 6.78725 6.37764 6.78725 6.47909 6.74558C6.53105 6.72699 6.5788 6.69826 6.61957 6.66107C6.66035 6.62388 6.69332 6.57895 6.71659 6.52891L6.97492 5.94558C7.19032 6.02261 7.41016 6.08661 7.63325 6.13724C7.74436 6.16224 7.85686 6.18308 7.97075 6.19974C8.06552 6.22007 8.15023 6.2728 8.21031 6.34885C8.27039 6.4249 8.30208 6.51951 8.29992 6.61641L8.30825 7.91641Z' fill='%230263E0'/%3E%3C/svg%3E");
    width: 22px;
    height: 22px;
  }
  
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Transfer::before {
    content: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.66675 4.99967C1.66675 4.76956 1.8533 4.58301 2.08341 4.58301H7.91675C8.14687 4.58301 8.33341 4.76956 8.33341 4.99967C8.33341 5.22979 8.14687 5.41634 7.91675 5.41634H2.08341C1.8533 5.41634 1.66675 5.22979 1.66675 4.99967Z' fill='%230263E0'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.70529 1.78903C4.86801 1.62631 5.13183 1.62631 5.29455 1.78903L8.21121 4.7057C8.37393 4.86842 8.37393 5.13223 8.21121 5.29495L5.29455 8.21162C5.13183 8.37434 4.86801 8.37434 4.70529 8.21162C4.54257 8.0489 4.54257 7.78508 4.70529 7.62236L7.32733 5.00033L4.70529 2.37829C4.54257 2.21557 4.54257 1.95175 4.70529 1.78903Z' fill='%230263E0'/%3E%3C/svg%3E");
    width: 22px;
    height: 22px;
  }
  
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Call:hover::before {
    content: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.09992 5.41641C8.00825 5.41641 7.91242 5.38724 7.82075 5.36641C7.63512 5.3255 7.4527 5.27119 7.27492 5.20391C7.08162 5.13359 6.86915 5.13724 6.67838 5.21416C6.48762 5.29108 6.33204 5.43584 6.24159 5.62057L6.14992 5.80807C5.74409 5.58232 5.37116 5.30192 5.04159 4.97474C4.71441 4.64517 4.43401 4.27224 4.20825 3.86641L4.38325 3.74974C4.56799 3.65929 4.71275 3.50371 4.78967 3.31295C4.86659 3.12218 4.87024 2.90971 4.79992 2.71641C4.73376 2.53825 4.67948 2.35591 4.63742 2.17058C4.61659 2.07891 4.59992 1.98308 4.58742 1.88724C4.53682 1.59375 4.3831 1.32797 4.15393 1.13776C3.92476 0.947549 3.63521 0.845412 3.33742 0.849742H2.08742C1.90785 0.848056 1.73002 0.885081 1.56605 0.958296C1.40207 1.03151 1.2558 1.1392 1.13718 1.27403C1.01857 1.40885 0.930393 1.56766 0.878665 1.73962C0.826937 1.91159 0.81287 2.09268 0.83742 2.27057C1.05939 4.01615 1.8566 5.63802 3.10311 6.88001C4.34962 8.12199 5.97438 8.91329 7.72075 9.12891H7.87909C8.18634 9.12936 8.483 9.01663 8.71242 8.81224C8.84424 8.69434 8.94954 8.54982 9.02136 8.38821C9.09319 8.2266 9.12991 8.05159 9.12909 7.87474V6.62474C9.12398 6.33532 9.01859 6.05664 8.83089 5.83627C8.6432 5.6159 8.38484 5.4675 8.09992 5.41641ZM8.30825 7.91641C8.30818 7.97557 8.29551 8.03404 8.27108 8.08792C8.24665 8.1418 8.21103 8.18986 8.16659 8.22891C8.12003 8.26911 8.06559 8.29914 8.00675 8.31707C7.94792 8.33501 7.88598 8.34046 7.82492 8.33308C6.26446 8.13299 4.81502 7.41911 3.70522 6.30403C2.59542 5.18895 1.88842 3.73613 1.69575 2.17474C1.68912 2.11371 1.69493 2.05196 1.71284 1.99324C1.73074 1.93451 1.76037 1.88003 1.79992 1.83308C1.83897 1.78863 1.88703 1.75301 1.94091 1.72858C1.99479 1.70416 2.05326 1.69148 2.11242 1.69141H3.36242C3.45931 1.68925 3.55393 1.72094 3.62998 1.78102C3.70603 1.8411 3.75876 1.92581 3.77909 2.02057C3.79575 2.13446 3.81659 2.24696 3.84159 2.35807C3.88972 2.57772 3.95378 2.79357 4.03325 3.00391L3.44992 3.27474C3.40004 3.29763 3.35518 3.33014 3.3179 3.37041C3.28063 3.41068 3.25167 3.45791 3.2327 3.50941C3.21373 3.5609 3.20512 3.61563 3.20736 3.67046C3.2096 3.72529 3.22265 3.77914 3.24575 3.82891C3.84542 5.11339 4.87794 6.14591 6.16242 6.74558C6.26386 6.78725 6.37764 6.78725 6.47909 6.74558C6.53105 6.72699 6.5788 6.69826 6.61957 6.66107C6.66035 6.62388 6.69332 6.57895 6.71659 6.52891L6.97492 5.94558C7.19032 6.02261 7.41016 6.08661 7.63325 6.13724C7.74436 6.16224 7.85686 6.18308 7.97075 6.19974C8.06552 6.22007 8.15023 6.2728 8.21031 6.34885C8.27039 6.4249 8.30208 6.51951 8.29992 6.61641L8.30825 7.91641Z' fill='white'/%3E%3C/svg%3E");
    width: 22px;
    height: 22px;
  }
  
  .Twilio-WorkerDirectory-ButtonContainer .Twilio-Icon-Transfer:hover::before {
    content: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.66675 4.99967C1.66675 4.76956 1.8533 4.58301 2.08341 4.58301H7.91675C8.14687 4.58301 8.33341 4.76956 8.33341 4.99967C8.33341 5.22979 8.14687 5.41634 7.91675 5.41634H2.08341C1.8533 5.41634 1.66675 5.22979 1.66675 4.99967Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.70529 1.78903C4.86801 1.62631 5.13183 1.62631 5.29455 1.78903L8.21121 4.7057C8.37393 4.86842 8.37393 5.13223 8.21121 5.29495L5.29455 8.21162C5.13183 8.37434 4.86801 8.37434 4.70529 8.21162C4.54257 8.0489 4.54257 7.78508 4.70529 7.62236L7.32733 5.00033L4.70529 2.37829C4.54257 2.21557 4.54257 1.95175 4.70529 1.78903Z' fill='white'/%3E%3C/svg%3E");
    width: 22px;
    height: 22px;
  }

  .Twilio-WorkerDirectory-ButtonContainer > .Twilio-IconButton {
	  margin-right: 4px;
  }
  
  /*AGENT DESKTOP VIEW*/

  .Twilio-AgentDesktopView\\.Panel1 [role=separator] svg {
	  display: none;
  }

  .Twilio-AgentDesktopView\\.Panel1 [role=separator]::before {
    content: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.25 1.75C3.25 1.45333 3.16203 1.16332 2.9972 0.916644C2.83238 0.66997 2.59812 0.477711 2.32403 0.36418C2.04994 0.250648 1.74834 0.220943 1.45737 0.278821C1.16639 0.336699 0.899119 0.47956 0.68934 0.689339C0.479562 0.899118 0.3367 1.16639 0.278823 1.45736C0.220945 1.74834 0.25065 2.04993 0.364181 2.32402C0.477713 2.59811 0.669972 2.83238 0.916645 2.9972C1.16332 3.16203 1.45333 3.25 1.75 3.25C2.14783 3.25 2.52936 3.09196 2.81066 2.81066C3.09197 2.52935 3.25 2.14782 3.25 1.75ZM10.75 1.75C10.75 2.04667 10.838 2.33668 11.0028 2.58335C11.1676 2.83003 11.4019 3.02229 11.676 3.13582C11.9501 3.24935 12.2517 3.27905 12.5426 3.22118C12.8336 3.1633 13.1009 3.02044 13.3107 2.81066C13.5204 2.60088 13.6633 2.33361 13.7212 2.04263C13.7791 1.75166 13.7494 1.45006 13.6358 1.17597C13.5223 0.901884 13.33 0.667616 13.0834 0.502794C12.8367 0.337972 12.5467 0.249999 12.25 0.249999C11.8522 0.249999 11.4706 0.408034 11.1893 0.689339C10.908 0.970643 10.75 1.35217 10.75 1.75ZM5.5 1.75C5.5 2.04667 5.58797 2.33668 5.7528 2.58335C5.91762 2.83003 6.15189 3.02229 6.42598 3.13582C6.70007 3.24935 7.00166 3.27905 7.29264 3.22118C7.58361 3.1633 7.85088 3.02044 8.06066 2.81066C8.27044 2.60088 8.4133 2.33361 8.47118 2.04263C8.52906 1.75166 8.49935 1.45006 8.38582 1.17597C8.27229 0.901885 8.08003 0.667617 7.83336 0.502794C7.58668 0.337972 7.29667 0.249999 7 0.249999C6.60218 0.249999 6.22065 0.408034 5.93934 0.689339C5.65804 0.970644 5.5 1.35217 5.5 1.75Z' fill='%238A91A8'/%3E%3Cpath d='M3.25 6.25C3.25 5.95333 3.16203 5.66332 2.9972 5.41664C2.83238 5.16997 2.59812 4.97771 2.32403 4.86418C2.04994 4.75065 1.74834 4.72094 1.45737 4.77882C1.16639 4.8367 0.899119 4.97956 0.68934 5.18934C0.479562 5.39912 0.3367 5.66639 0.278823 5.95736C0.220945 6.24834 0.25065 6.54993 0.364181 6.82402C0.477713 7.09811 0.669972 7.33238 0.916645 7.4972C1.16332 7.66203 1.45333 7.75 1.75 7.75C2.14783 7.75 2.52936 7.59196 2.81066 7.31066C3.09197 7.02935 3.25 6.64782 3.25 6.25ZM10.75 6.25C10.75 6.54667 10.838 6.83668 11.0028 7.08335C11.1676 7.33003 11.4019 7.52229 11.676 7.63582C11.9501 7.74935 12.2517 7.77905 12.5426 7.72118C12.8336 7.6633 13.1009 7.52044 13.3107 7.31066C13.5204 7.10088 13.6633 6.83361 13.7212 6.54263C13.7791 6.25166 13.7494 5.95006 13.6358 5.67597C13.5223 5.40188 13.33 5.16762 13.0834 5.00279C12.8367 4.83797 12.5467 4.75 12.25 4.75C11.8522 4.75 11.4706 4.90803 11.1893 5.18934C10.908 5.47064 10.75 5.85217 10.75 6.25ZM5.5 6.25C5.5 6.54667 5.58797 6.83668 5.7528 7.08335C5.91762 7.33003 6.15189 7.52229 6.42598 7.63582C6.70007 7.74935 7.00166 7.77905 7.29264 7.72118C7.58361 7.6633 7.85088 7.52044 8.06066 7.31066C8.27044 7.10088 8.4133 6.83361 8.47118 6.54263C8.52906 6.25166 8.49935 5.95006 8.38582 5.67597C8.27229 5.40188 8.08003 5.16762 7.83336 5.00279C7.58668 4.83797 7.29667 4.75 7 4.75C6.60218 4.75 6.22065 4.90803 5.93934 5.18934C5.65804 5.47064 5.5 5.85217 5.5 6.25Z' fill='%238A91A8'/%3E%3C/svg%3E");
	  width: 24px;
	  top: 8%;
	  left: 48%;
  }
  
  /*SIDE BAR*/
  
  .Twilio-SideNav-Container > .Twilio-SideNav {
    background: #4B5671;
  }
  .Twilio-SideNav-Container > div > .Twilio-SideNav-default > button {
	  background: #4B5671;
  }
  .Twilio-SideNav-Container > div > .Twilio-SideNav-default > button > .Twilio-Side-Link-IconContainer > div,
  .Twilio-SideNav-Container > div > .Twilio-SideNav-default > button > div > span{
    color: white;
    font-family: 'Inter', sans-serif;
  }
  
  /*.Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(2) > div.Twilio-Side-Link-IconContainer > div > svg,
  .Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(3) > div.Twilio-Side-Link-IconContainer > div > svg,
  .Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(4) > div.Twilio-Side-Link-IconContainer > div > svg {
    display: none;
  }
  
  .Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(2) > div.Twilio-Side-Link-IconContainer > div::before {
    content: url("data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.458233 4.15972L5.70823 7.19305C5.79691 7.24425 5.8975 7.2712 5.9999 7.2712C6.1023 7.2712 6.20289 7.24425 6.29157 7.19305L11.5416 4.15972C11.63 4.10844 11.7033 4.03484 11.7543 3.94628C11.8054 3.85773 11.8322 3.75733 11.8322 3.65513C11.8322 3.55294 11.8054 3.45254 11.7543 3.36398C11.7033 3.27543 11.63 3.20183 11.5416 3.15055L6.29157 0.117214C6.20289 0.0660163 6.1023 0.0390625 5.9999 0.0390625C5.8975 0.0390625 5.79691 0.0660163 5.70823 0.117214L0.458233 3.15055C0.369835 3.20183 0.296459 3.27543 0.245453 3.36398C0.194447 3.45254 0.1676 3.55294 0.1676 3.65513C0.1676 3.75733 0.194447 3.85773 0.245453 3.94628C0.296459 4.03484 0.369835 4.10844 0.458233 4.15972ZM5.9999 1.29555L10.0832 3.62888L5.9999 5.99138L1.91657 3.65221L5.9999 1.29555ZM10.9582 5.83971L5.9999 8.70388L1.04157 5.83971C0.975336 5.8009 0.902097 5.77555 0.826047 5.7651C0.749998 5.75465 0.672634 5.75931 0.59839 5.77882C0.524147 5.79833 0.454484 5.8323 0.393396 5.87879C0.332307 5.92527 0.280995 5.98336 0.242399 6.04972C0.20383 6.11629 0.178813 6.18984 0.168789 6.26613C0.158766 6.34242 0.163934 6.41994 0.183995 6.49422C0.204057 6.5685 0.238615 6.63808 0.285681 6.69895C0.332747 6.75982 0.39139 6.81077 0.458233 6.84888L5.70823 9.88222C5.79691 9.93341 5.8975 9.96037 5.9999 9.96037C6.1023 9.96037 6.20289 9.93341 6.29157 9.88222L11.5416 6.84888C11.6084 6.81077 11.6671 6.75982 11.7141 6.69895C11.7612 6.63808 11.7957 6.5685 11.8158 6.49422C11.8359 6.41994 11.841 6.34242 11.831 6.26613C11.821 6.18984 11.796 6.11629 11.7574 6.04972C11.7188 5.98336 11.6675 5.92527 11.6064 5.87879C11.5453 5.8323 11.4757 5.79833 11.4014 5.77882C11.3272 5.75931 11.2498 5.75465 11.1738 5.7651C11.0977 5.77555 11.0245 5.8009 10.9582 5.83971Z' fill='white'/%3E%3C/svg%3E");
	  width: 44px;
  }
  
  .Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(3) > div.Twilio-Side-Link-IconContainer > div::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.1019 8.67983C11.1825 8.36789 11.5006 8.18031 11.8126 8.26085C12.4383 8.42241 12.9926 8.78721 13.3886 9.29796C13.7845 9.80871 13.9996 10.4365 14.0001 11.0827L14.0001 12.2498C14.0001 12.572 13.7389 12.8332 13.4167 12.8332C13.0946 12.8332 12.8334 12.572 12.8334 12.2498L12.8334 11.0836C12.8334 11.0835 12.8334 11.0837 12.8334 11.0836C12.8331 10.6959 12.704 10.3191 12.4665 10.0127C12.2289 9.70629 11.8963 9.48741 11.5209 9.39047C11.209 9.30993 11.0214 8.99177 11.1019 8.67983Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.854272 9.02126C1.40125 8.47428 2.14312 8.16699 2.91667 8.16699H7.58333C8.35688 8.16699 9.09875 8.47428 9.64573 9.02126C10.1927 9.56825 10.5 10.3101 10.5 11.0837V12.2503C10.5 12.5725 10.2388 12.8337 9.91667 12.8337C9.5945 12.8337 9.33333 12.5725 9.33333 12.2503V11.0837C9.33333 10.6195 9.14896 10.1744 8.82077 9.84622C8.49258 9.51803 8.04746 9.33366 7.58333 9.33366H2.91667C2.45254 9.33366 2.00742 9.51803 1.67923 9.84622C1.35104 10.1744 1.16667 10.6195 1.16667 11.0837V12.2503C1.16667 12.5725 0.905499 12.8337 0.583333 12.8337C0.261167 12.8337 0 12.5725 0 12.2503V11.0837C0 10.3101 0.307291 9.56825 0.854272 9.02126Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.76813 1.68097C8.84804 1.36887 9.16582 1.18065 9.47792 1.26056C10.1053 1.42119 10.6614 1.78607 11.0585 2.29766C11.4556 2.80925 11.6711 3.43845 11.6711 4.08608C11.6711 4.7337 11.4556 5.36291 11.0585 5.8745C10.6614 6.38609 10.1053 6.75096 9.47792 6.9116C9.16582 6.99151 8.84804 6.80328 8.76813 6.49118C8.68822 6.17908 8.87644 5.8613 9.18854 5.78139C9.56497 5.68501 9.89862 5.46608 10.1369 5.15913C10.3751 4.85217 10.5045 4.47465 10.5045 4.08608C10.5045 3.6975 10.3751 3.31998 10.1369 3.01303C9.89862 2.70607 9.56497 2.48715 9.18854 2.39077C8.87644 2.31086 8.68822 1.99307 8.76813 1.68097Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.24992 2.33366C4.28342 2.33366 3.49992 3.11716 3.49992 4.08366C3.49992 5.05016 4.28342 5.83366 5.24992 5.83366C6.21642 5.83366 6.99992 5.05016 6.99992 4.08366C6.99992 3.11716 6.21642 2.33366 5.24992 2.33366ZM2.33325 4.08366C2.33325 2.47283 3.63909 1.16699 5.24992 1.16699C6.86075 1.16699 8.16658 2.47283 8.16658 4.08366C8.16658 5.69449 6.86075 7.00033 5.24992 7.00033C3.63909 7.00033 2.33325 5.69449 2.33325 4.08366Z' fill='%23AEB2C1'/%3E%3C/svg%3E");
	  width: 44px;
  }
  
  .Twilio-SideNav-Container > div > div.Twilio-SideNav-default > button:nth-child(4) > div.Twilio-Side-Link-IconContainer > div::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.08325 10.5003C4.08325 10.1782 4.34442 9.91699 4.66659 9.91699H12.2499C12.5721 9.91699 12.8333 10.1782 12.8333 10.5003C12.8333 10.8225 12.5721 11.0837 12.2499 11.0837H4.66659C4.34442 11.0837 4.08325 10.8225 4.08325 10.5003Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.16675 10.5003C1.16675 10.1782 1.42792 9.91699 1.75008 9.91699H1.75591C2.07808 9.91699 2.33925 10.1782 2.33925 10.5003C2.33925 10.8225 2.07808 11.0837 1.75591 11.0837H1.75008C1.42792 11.0837 1.16675 10.8225 1.16675 10.5003Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.08325 7.00033C4.08325 6.67816 4.34442 6.41699 4.66659 6.41699H12.2499C12.5721 6.41699 12.8333 6.67816 12.8333 7.00033C12.8333 7.32249 12.5721 7.58366 12.2499 7.58366H4.66659C4.34442 7.58366 4.08325 7.32249 4.08325 7.00033Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.16675 7.00033C1.16675 6.67816 1.42792 6.41699 1.75008 6.41699H1.75591C2.07808 6.41699 2.33925 6.67816 2.33925 7.00033C2.33925 7.32249 2.07808 7.58366 1.75591 7.58366H1.75008C1.42792 7.58366 1.16675 7.32249 1.16675 7.00033Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.08325 3.50033C4.08325 3.17816 4.34442 2.91699 4.66659 2.91699H12.2499C12.5721 2.91699 12.8333 3.17816 12.8333 3.50033C12.8333 3.82249 12.5721 4.08366 12.2499 4.08366H4.66659C4.34442 4.08366 4.08325 3.82249 4.08325 3.50033Z' fill='%23AEB2C1'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.16675 3.50033C1.16675 3.17816 1.42792 2.91699 1.75008 2.91699H1.75591C2.07808 2.91699 2.33925 3.17816 2.33925 3.50033C2.33925 3.82249 2.07808 4.08366 1.75591 4.08366H1.75008C1.42792 4.08366 1.16675 3.82249 1.16675 3.50033Z' fill='%23AEB2C1'/%3E%3C/svg%3E");
	  width: 44px;
  }*/
`;
