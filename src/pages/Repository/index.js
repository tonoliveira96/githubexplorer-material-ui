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
} from "@material-ui/core";

import { ArrowRight } from "@material-ui/icons";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import api from "../../api/services";

function Repository() {
  const [repository, setRepository] = useState();
  const [issues, setIssues] = useState([]);

  const { params } = useRouteMatch();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      //const repo = response.data;
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
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
              <ListItem>
                <b>Forks:</b> {repository.forks_count}
              </ListItem>
            </Grid>
            <Grid item xs={4}>
              <ListItem>
                <b>Stars:</b> {repository.stargazers_count}
              </ListItem>
            </Grid>
            <Grid item xs={4}>
              <ListItem>
                <b>Issues:</b> {repository.open_issues_count}
              </ListItem>
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
