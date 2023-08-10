import {Box, Typography, useTheme} from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {tokens} from "../theme"

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Question Page"/>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        An Importan question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem incidunt, inventore laudantium maxime optio perferendis saepe sint ut voluptatibus. Aliquid aperiam atque eligendi facere ipsam ipsum quia quidem rem?
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Another Importan question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem incidunt, inventore laudantium maxime optio perferendis saepe sint ut voluptatibus. Aliquid aperiam atque eligendi facere ipsam ipsum quia quidem rem?
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Your Favorite question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam autem incidunt, inventore laudantium maxime optio perferendis saepe sint ut voluptatibus. Aliquid aperiam atque eligendi facere ipsam ipsum quia quidem rem?
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
export default FAQ;