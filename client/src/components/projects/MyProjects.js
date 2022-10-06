import { Grid } from "@mui/material";
import Project from "./Project";
import { useEffect, useState } from "react";
import image from "../../assets/projects/e-learning-website.jpeg";
export default function MyProjects() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("Adnnann");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => response.json())
      .then((data) => setGithubData(data));
  };
  console.log(githubData);
  return (
    <Grid container justifyContent={"space-evenly"} spacing={6} marginTop={5}>
      {githubData.map((project, index) => (
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
