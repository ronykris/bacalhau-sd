# Stable Diffusion using Bacalhau

A hack to generate images from text using an amalgamation of Stable Diffusion and Bacalhau by invoking an API.

## Bacalhau 
[Bacalhau](https://www.bacalhau.org/) is a peer-to-peer network of nodes where each node participates in executing (computing) jobs submitted to the cluster. This architecture is referred to as Compute Over Data (or COD). 

Submitting jobs to bacalhau is easy if you have a machine handy. All you have to do is run the commands below and you are set.

```
curl -sL https://get.bacalhau.org/install.sh | bash
bacalhau docker run ubuntu echo hello
bacalhau list
```

## The hack...
This is a rather hacky way of getting SD to generate images via Bacalhau through an API call. 

Syntax:
```
http://localhost:3080/?prompt=cat on a mountain top basking in sunshine
```

All you have to do is:

### localhost:
```
1. Clone the repo
2. npm install
3. npm run start

Alternatively build the docker image and run it as a container.
```

### cloud hosted
Using the Dockerfile one could build the image and host it on gcloud. This allows you to generate the image through an API call. It's pretty straight forward and the cmds are avialble in google's documentation.

[Installing and configuring gcloud cli](https://cloud.google.com/sdk/docs/install)

[Building containers](https://cloud.google.com/run/docs/building/containers#buildpacks)

```
Feel free to reach out if you are looking for exact cmds
```







