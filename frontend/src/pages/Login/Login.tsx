import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

export default function Login() {

  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const [prevNavigationState, setPrevNavigationState] = useState(navigation.state);
  const [activeTab, setActiveTab] = useState(0);
  const [errorVisibility, setErrorVisibility] = useState<boolean>(false);

  if (prevNavigationState !== navigation.state) {
    setPrevNavigationState(navigation.state);
    if (navigation.state === 'idle')
      setErrorVisibility(true);
    else
      setErrorVisibility(false);
  }

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setErrorVisibility(false);
  }

  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Stack direction="row" sx={{ gap: 8, backgroundColor: "primary.main", height: "100%", width: "100%", transition: "background-color 0.5s" }}>
        <Stack direction="column" sx={{ backgroundColor: "primary.dark", width: "20%", minWidth: 276, padding: 48, gap: 16, transition: "background-color 0.5s" }}>
          <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant="fullWidth" centered>
              <Tab label="Sign In" value={0} />
              <Tab label="Register" value={1} />
            </Tabs>
          </Box>
          <CustomTabPanel value={activeTab} index={0}>
            <Form method="post">
              <Stack direction="column" sx={{ gap: 8, transition: "background-color 0.5s" }}>
                <TextField required name="email" label="Email" type="email" color="secondary" variant="outlined" />
                <TextField required name="password" label="Password" type="password" color="secondary" variant="outlined" />
                <Button name="formType" value="login" type="submit" disabled={isSubmitting} variant="contained" color="secondary">{isSubmitting ? "Logging in..." : "Sign In"}</Button>
                {errorVisibility && <Typography variant="body2" color="error">Error: {actionData?.description}</Typography>}
              </Stack>
            </Form>
          </CustomTabPanel>
          <CustomTabPanel value={activeTab} index={1}>
            <Form method="post">
              <Stack direction="column" sx={{ gap: 8, transition: "background-color 0.5s" }}>
                <TextField required name="email" label="Email" type="email" color="secondary" variant="outlined" />
                <TextField required name="password" label="Password" type="password" color="secondary" variant="outlined" />
                <TextField required name="confirmPassword" label="Confirm Password" type="password" color="secondary" variant="outlined" />
                <Button name="formType" value="register" type="submit" disabled={isSubmitting} variant="contained" color="secondary">{isSubmitting ? "Registering..." : "Register"}</Button>
                {errorVisibility && <Typography variant="body2" color="error">Error: {actionData?.description}</Typography>}
              </Stack>
            </Form>
          </CustomTabPanel>
        </Stack>
      </Stack>
    </Box>
  );
}