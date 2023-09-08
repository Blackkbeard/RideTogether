import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

const Profile = (props) => {
  const params = useParams();
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  //States
  const { posts, setPosts } = useState([]);
  const { currProfile, setCurrProfile } = useState([]);

  const getPostsByUserId = async () => {
    try {
      const response = await fetch("/api/newPost/" + user_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner_id: params.item,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        const errorData = await response.json();
        alert(JSON.stringify(errorData));
        console.log(errorData);
      }
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };
  const getProfileInfo = async () => {
    const res = await fetchData("/auth/accounts/" + params.item);

    if (res.ok) {
      setCurrProfile(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };
  useEffect(() => {
    getListingsByUserId();
    getProfileInfo();
  }, [params.item]);

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              <Avt size={12} src={currProfile.image_url}></Avt>
            </Grid>
            <Grid xs={8} sx={{ mt: "2rem" }}>
              <Box>
                <Typography
                  variant="h4"
                  marginBottom="1rem"
                  sx={{ ml: "3rem", mr: "3rem" }}
                >
                  {currProfile.display_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ ml: "3rem" }}
                >
                  {/* optional chaining for object and array to prevent page load fail */}
                  {`Neighbourhood: ${currProfile.location?.[0].district}`}
                </Typography>
                <Typography sx={{ ml: "3rem" }}>
                  {currProfile.biography}
                </Typography>
              </Box>
              <Chip
                icon={
                  <FavoriteBorderIcon
                    fontSize="large"
                    style={{ color: "var(--burgundy)" }}
                  />
                }
                label={`${currProfile.help_count} Neighbours helped`}
                variant="outlined"
                sx={{ ml: "3rem", mt: "1rem" }}
                style={{
                  height: "3rem",
                  width: "30%",
                  borderColor: "var(--burgundy)",
                }}
              />
            </Grid>
            <Grid xs={2} sx={{ mt: "2rem" }}>
              {userCtx.userId === params.item && (
                <Btn onClick={() => navigate("/settings")}>Edit Profile</Btn>
              )}
            </Grid>
          </Grid>
          <Divider
            sx={{ mt: "2rem", borderWidth: "10", borderColor: "black" }}
          />
          <Grid container alignItems="center">
            <Grid xs={10} sx={{ mt: "1rem" }}>
              <Typography variant="h5">
                {userCtx.userId === params.item
                  ? "Your Listings"
                  : `${currProfile.display_name}'s Listings`}
              </Typography>
            </Grid>
            <Grid xs={2} sx={{ mt: "1rem" }}>
              {userCtx.userId === params.item && (
                <Btn onClick={() => navigate("/add-offer")}>+ Add Offer</Btn>
              )}
            </Grid>
            {/* listings card */}
            {listings ? (
              <Listings listings={listings}></Listings>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default Profile;
