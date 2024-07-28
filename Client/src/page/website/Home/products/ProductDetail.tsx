import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Grid,
  Rating,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatCurrencyVND } from "../../../../services/VND/Vnd";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import ImgProductDetail from "./ImgProductDetail";
import StarIcon from "@mui/icons-material/Star";
import useProductsQuery from "../../../../hook/UseProductsQuery";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotFound from "../NotFound/NotFound";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import useCartMutation from "../../../../hook/useCartMutation";
import EvaluateSection from "../Evaluate/EvaluateSection";
import CommentSection from "../Comment/CommentSection";

const AddCartButton = styled(Button)({
  width: 250,
  height: 64,
  fontSize: 20,
  fontWeight: 400,
  borderRadius: 15,
  border: "1px solid black",
});

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const value = 4.5;

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data: product, isLoading } = useProductsQuery(id);
  const { mutate } = useCartMutation({
    action: "CREATE",
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!product) {
    return <NotFound />;
  }

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };
  const userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
  if (!userId) return toast.error("Bạn chưa đăng nhập !!");
  const productId = product._id;
  const handleAddToCart = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await mutate({
      userId,
      productId,
      quantity,
    });
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 5 }}>
      <form onSubmit={handleAddToCart}>
        <Box
          sx={{
            padding: 4,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          }}
        >
          <Grid container gap={6} alignItems={"center"} spacing={2}>
            <Grid item xs={2}>
              <ImgProductDetail product={product} />
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{
                  bgcolor: "#f3f3f3",
                  borderRadius: 5,
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    zIndex: 10,
                    left: 5,
                    bgcolor: "white",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    marginLeft: "-90px",
                    height: "auto",
                    transform: "rotate(-35deg)",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    bgcolor: "white",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Typography
              variant="h4"
              fontFamily="Poppins"
              fontWeight={400}
              textAlign="left"
            >
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Poppins"
              fontWeight={500}
              color="black"
              my={2}
            >
              {product.discount > 0
                ? formatCurrencyVND(
                    product.price * (1 - product.discount / 100)
                  )
                : formatCurrencyVND(product.price)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 230, display: "flex", alignItems: "center" }}>
                <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography variant="body1" color="black" ml={2}>
                  {labels[value]}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                fontFamily="Poppins"
                color="black"
                pl={3}
                borderLeft="1px solid #9F9F9F"
              >
<<<<<<< HEAD
                <ArrowBackIcon />
              </IconButton>
              <img
                src={product.img}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  marginLeft: "-90px",
                  height: "auto",
                  transform: "rotate(-35deg)",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: 5,
                  bgcolor: "white",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Typography sx={{}}
            variant="h4"
            fontFamily="Poppins"
            fontWeight={400}
            textAlign="left"
          >
            {product.name}
          </Typography>
          <Typography
            variant="h6"
            fontFamily="Poppins"
            fontWeight={500}
            color="black"
            my={2}
          >
            {product.discount > 0
              ? formatCurrencyVND(product.price * (1 - product.discount / 100))
              : formatCurrencyVND(product.price)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 230, display: "flex", alignItems: "center" }}>
              <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography variant="body1" color="black" ml={2}>
                {labels[value]}
=======
                2347 Review
>>>>>>> a56c60411d4e16980f381c5938f2254dba9381b8
              </Typography>
            </Box>
            <Typography
              variant="body1"
              fontFamily="Poppins"
              my={2}
              width={500}
              fontSize={20}
            >
              {product.description}
            </Typography>
            <Typography
              variant="body1"
              fontFamily="Poppins"
              fontWeight={400}
              color="#9F9F9F"
              mt={3}
            >
              {product.size}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                fontFamily="Poppins"
                my={2}
                fontSize={20}
              >
                quantity:
              </Typography>
              <IconButton onClick={decreaseQuantity}>
                <Remove />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                style={{ width: "60px", textAlign: "center" }}
              />
              <IconButton onClick={increaseQuantity}>
                <Add />
              </IconButton>
            </Box>
            <Box
              sx={{
                paddingTop: 4,
                borderBottom: "1px solid #D9D9D9",
                display: "grid",
                gap: 2,
                gridTemplateColumns: "170px 237px 1fr",
                paddingBottom: 6,
              }}
            >
              <AddCartButton type="submit" variant="contained">
                Add to Cart
              </AddCartButton>
            </Box>
          </Box>
        </Box>
      </form>
      <EvaluateSection product={product} />
      <CommentSection />
    </Container>
  );
};

export default ProductDetail;
