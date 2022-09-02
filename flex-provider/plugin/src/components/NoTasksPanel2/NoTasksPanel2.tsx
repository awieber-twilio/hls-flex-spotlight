import { NoTasksPanel2Styles } from "./NoTasksPanel2.Styles";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { black, twilioRed } from "../../CustomTheme";

const theme = createTheme({
  palette: {
    secondary: {
      main: black
    },
    primary: {
      main: twilioRed
    }
  }
});

const NoTasksPanel2 = () => {
  return (
      <MuiThemeProvider theme={theme}>
        <NoTasksPanel2Styles>
          <Paper className="paper">
{/*
            <img width="30%" src="https://hls-site-4115-dev.twil.io/owlhealth/images/logoOwlHealth.png"/>
*/}
            <img width="30%" src="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 457.99 31.22'%3E%3Cdefs%3E%3Cstyle%3E.d%7Bletter-spacing:.1em;%7D.e%7Bletter-spacing:.1em;%7D.f%7Bletter-spacing:0em;%7D.g,.h%7Bfill:%23fff;%7D.i%7Bletter-spacing:.06em;%7D.h%7Bfont-family:Geograph-Bold, Geograph;font-size:27.74px;%7D%3C/style%3E%3C/defs%3E%3Cg id='a'/%3E%3Cg id='b'%3E%3Cg id='c'%3E%3Cg%3E%3Ctext class='h' transform='translate(46.37 24.35)'%3E%3Ctspan class='e' x='0' y='0'%3EC%3C/tspan%3E%3Ctspan class='i' x='20.5' y='0'%3EL%3C/tspan%3E%3Ctspan class='e' x='37.25' y='0'%3EOUD CITY HEA%3C/tspan%3E%3Ctspan class='f' x='266.92' y='0'%3EL%3C/tspan%3E%3Ctspan class='d' x='282.09' y='0'%3ETHCARE%3C/tspan%3E%3C/text%3E%3Cg%3E%3Cpath class='g' d='M29.37,9.25V3.7C29.37,1.66,27.72,0,25.67,0h-5.55C18.09,0,16.43,1.66,16.43,3.7V12.48c0,.26,.21,.46,.46,.46h8.78c2.04,0,3.7-1.66,3.7-3.7Z'/%3E%3Cpath class='g' d='M16.43,17.1v8.78c0,2.04,1.66,3.7,3.7,3.7h5.55c2.04,0,3.7-1.66,3.7-3.7v-5.55c0-2.04-1.66-3.7-3.7-3.7h-8.78c-.26,0-.46,.21-.46,.46Z'/%3E%3Cpath class='g' d='M0,20.34v5.55c0,2.04,1.66,3.7,3.7,3.7h5.55c2.04,0,3.7-1.66,3.7-3.7v-8.78c0-.26-.21-.46-.46-.46H3.7C1.66,16.64,0,18.3,0,20.34Z'/%3E%3Cpath class='g' d='M12.94,12.48V3.7C12.94,1.66,11.29,0,9.25,0H3.7C1.66,0,0,1.66,0,3.7v5.55c0,2.04,1.66,3.7,3.7,3.7H12.48c.26,0,.46-.21,.46-.46Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E" alt="logo"/>
            <Typography component="h4" color="secondary">
              No Assigned Tasks, please wait for a task or accept one.
            </Typography>
          </Paper>
        </NoTasksPanel2Styles>
      </MuiThemeProvider>
  )
}

export default NoTasksPanel2
