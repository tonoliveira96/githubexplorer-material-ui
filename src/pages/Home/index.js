import React, { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";
import {
  Container,
  Button,
  Input,
  InputAdornment,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  Alert,
  ListItemButton,
} from "@material-ui/core";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  ArrowRight,
  GitHub,
} from "@material-ui/icons";

import api from "../../api/services";

function Home() {
  const [repo, setRepo] = useState("");
  const [error, setError] = useState(false);

  const [repoList, setRepoList] = useState(() => {
    const storageRepositories = localStorage.getItem(
      "@github-mui:repositories"
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  const history = useHistory()

  async function handleSaveRepo() {
    try {
      setError(false);
      const response = await api.get(`repos/${repo}`);

      const newRepo = {
        avatar_url: response.data.owner.avatar_url,
        full_name: response.data.full_name,
        description: response.data.description,
      };
      setRepoList([...repoList, newRepo]);
      setRepo("");
    } catch (err) {
      setError(true);
    }

    //localStorage.setItem("@github-mui",JSON.stringify(repoList))
    console.log(repoList);
  }

  function handleClick(full_name){
    history.push(`repository/${full_name}`)
  };

  // function handleDelete(id) {
  //   const updateRepoList = repoList.slice(id, 1);
  //   localStorage.setItem(
  //     "@github-mui:repositories",
  //     JSON.stringify(updateRepoList)
  //   );
  // }

  useEffect(() => {
    localStorage.setItem("@github-mui:repositories", JSON.stringify(repoList));
  }, [repoList]);

  const theme = createTheme({})

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="main">
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            <h1>Github Explorer - Material UI</h1>
          </Grid>
          <Grid item xs={12}>
            <Input
              id="input-with-icon-adornment"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              autoFocus
              startAdornment={
                <InputAdornment position="start">
                  <GitHub />/
                </InputAdornment>
              }
            />
            <Button
              onClick={handleSaveRepo}
              variant="contained"
              color="primary"
            >
              Adicionar
            </Button>
          </Grid>
          {error && (
            <Alert variant="outlined" severity="error">
              Repositório consultado não existe!
            </Alert>
          )}
        </Grid>
      </Container>
      {/*  */}
      <Container maxWidth="sm" className="main">
        <List>
          {repoList.map((data, index) => (
            <>
              <ListItemButton
                key={index}       
                onClick={()=>handleClick(data.full_name)}
              >
                <ListItemAvatar>
                  <Avatar src={data.avatar_url} />
                </ListItemAvatar>
                <ListItemText
                  primary={data.full_name}
                  secondary={data.description}
                />
                <ArrowRight />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
