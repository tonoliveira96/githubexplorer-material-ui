import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";

import "./styles.css";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  Link,
  ListItemIcon,
} from "@material-ui/core";

import { ArrowRight, FourKRounded, Star } from "@material-ui/icons";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import api from "../../api/services";

function Repository() {
  const [repository, setRepository] = useState();
  const [issues, setIssues] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { params } = useRouteMatch();

  async function getData() {
    if (!hasMore) {
      return;
    }
    await api.get(`repos/${params.repository}`).then((response) => {
      //const repo = response.data;
      setRepository(response.data);
    });

    await api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
    setHasMore(false);
  }
  useEffect(() => {
    getData();
    console.log(repository);
  }, [params.repository]);

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" className="main">
        {repository && (
          <Grid container spacing={0} rowSpacing={2}>
            <Grid item xs={4} sm={3}>
              <Avatar
                alt={repository.full_name}
                src={repository.owner.avatar_url}
                sx={{ width: 96, height: 96 }}
              />
            </Grid>
            <Grid item xs={8} sm={9}>
              <ListItemText
                primary={repository.full_name}
                secondary={repository.description}
              />
            </Grid>
            <Grid item xs={4}>
              <ListItemIcon>
                <FourKRounded /> {repository.forks_count}
              </ListItemIcon>
            </Grid>
            <Grid item xs={4}>
              <ListItemIcon title="teste">
                <Star /> {repository.stargazers_count}
              </ListItemIcon>
            </Grid>
            <Grid item xs={4}>
              <ListItemIcon></ListItemIcon>
            </Grid>
          </Grid>
        )}
      </Container>
      {/*  */}
      <Container maxWidth="sm" className="main">
        <List>
          {issues.map((data, index) => (
            <>
              <ListItem key={data.id}>
                <ListItemAvatar>
                  <Avatar src={data.user.avatar_url} />
                </ListItemAvatar>
                <ListItemText
                  primary={data.user.login}
                  secondary={data.title}
                />
                <Link href={data.html_url} target="_blank" variant="button">
                  <ArrowRight />
                </Link>
              </ListItem>

              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default Repository;
