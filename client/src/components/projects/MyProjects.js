import { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Project from "./Project";


const useStyles = makeStyles({
  container:{
    width:"80% !important", 
    margin:"0 auto !important",
    marginTop:"120px !important"
  }
})

export default function MyProjects() {

  const classes = useStyles()

  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGitHubUser] = useState("Adnnann");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={6}
      marginTop={5}
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
    >
      {githubData
        .filter((item) => item.topics.length > 0)
        .map((project, index) => (
          <Project
            key={index}
            image={`https://i.ibb.co/b3DZ6mc/${project.name}.jpg`}
            name={
              project.name.includes("_")
                ? project.name.replace(/_/g, " ").charAt(0).toUpperCase() +
                  project.name.replace(/_/g, " ").slice(1)
                : project.name.replace(/-/g, " ").charAt(0).toUpperCase() +
                  project.name.replace(/-/g, " ").slice(1)
            }
            date={project.created_at}
            description={project.description || "No description available"}
            linkToRepo={project.html_url}
            topics={project.topics}
          />
        ))}
    </Grid>
  );
}
