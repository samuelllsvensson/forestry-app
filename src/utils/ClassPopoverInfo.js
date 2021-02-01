import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    width: "100%",
  },
  title: {
    fontSize: 14,
    textAlign: "left",
  },
}));
const ClassPopoverInfo = ({ popType }) => {
  const classes = useStyles();

  const [type, setType] = useState("");
  const [id, setId] = useState(-1);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event, _popNo) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setId(popType);

    if (popType === 1) {
      setType("mouse-over-popover");
    } else {
      setType("mouse-over-class-popover");
    }
  }, []);

  const PopoverContent = (type) => {
    if (type === 1) {
      return (
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          style={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableRestoreFocus
        >
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Beskrivning:
              </Typography>
              <Typography variant="body2">
                PG: Generell Naturhänsyn{" "}
                {/* Målklass för avdelningar med låga naturvärden där produktionsmålet klart dominerar och styr skötseln. I skogsbruksplanen förtydligas produktionsinriktningen med ett produktionsmål som bl.a. tar hänsyn till föryngringsmetod, kvalitetsförutsättningar och val av trädslag. Miljöhänsynen motsvarar högst c:a 10 % av avdelningens produktiva skogsmarksareal där naturhänsyn tas genom att hänsynsytor, trädgrupper, evighetsträd och buskar m.m. lämnas. Målklass PG omfattar c:a 85–90 % av skogsmarken. Målklassen gäller till exempel produktionsskogar med tall och gran, dikade sumpskogar med låga naturvärden, granodlingar på åkermark, välskötta ekskogar och produktionsinriktade björkskogar. */}
              </Typography>
              <Typography variant="body2">
                PF: Förstärkt Naturhänsyn{" "}
                {/* Målklass för bestånd där en hög naturvårdsmålsättning går att förena med produktionsinriktad skötsel. Produktionsmålet styr huvudinriktningen av skötseln, medan naturvårdsmålet dominerar i vissa delar av avdelningen. Den förstärkta naturhänsynen innebär att mer än 10 % (upp till c:a 50 %) av avdelningens produktiva skogsmarksareal utgörs av naturhänsyn. Naturvårdsmålet utgör oftast c:a 30 % av avdelningens produktiva skogsmarksareal. Förhållandet mellan produktionsmålen och naturvårdsmålen anges som procentsatser av avdelningens produktiva skogsmarksareal. Målklassen används i t.ex. naturtyper med en omfattande naturhänsyn i form av solitärer, trädgrupper och hänsynsytor, i sumpskogar med skuggkrävande markflora där man arbetar med s.k. evighetsskärmar, i ekskogar med jätteträdsutveckling tillsammans med ekproduktion, i blandskogar med stort inslag av björk och asp, på platser med tjäderspel, i större kantzoner utefter biologiskt intressanta vattenekosystem, samt i bestånd med förutsättningar att återskapa föregående naturtyper. */}
              </Typography>
              <Typography variant="body2">
                NO: Naturvård, orört{" "}
                {/* Målklass för bestånd med höga naturvärden där naturvärdena utvecklas i negativ riktning om beståndet lämnas orört. Naturvårdsmålet styr skötseln som endast utförs när det är motiverat av naturvårdsskäl. Målklassen används exempelvis i björk- och aspskogar med höga naturvärden som hotas av nyetablerad gran, i strandskogar och lövsumpskogar utan naturlig vattendynamik där höga naturvärden hotas av nyetablerad gran, i tallskogar med förutsättningar för naturvårdsbränning, i ekskogar med höga naturvärden och konkurrerande sekundärträd, i betesskogar eller floralokaler som gynnas av solljus och bete, samt i bestånd med förutsättningar att återskapa ovanstående naturtyper. */}
              </Typography>
              <Typography variant="body2">
                NS: Naturvård med skötsel{" "}
                {/*Målklass för bestånd med höga naturvärden och stabila biologiska kvaliteter. Områdets naturvärden ska bibehållas eller återskapas. Naturvårdsmålet styr genom att området lämnas till fri utveckling, eventuellt med nyskapande av död ved för att påskynda utvecklingen av höga naturvärden. Målklassen används exempelvis i granskog med lång historik och naturskogskaraktär, i rasbranter med stabil pionjärträdsdynamik eller sekundärträd, i strandskog med naturlig vattendynamik, i lövsumpskogar med naturlig vattendynamik, i bokskog med naturskogskaraktär, i alm- eller lindskogar (dvs. ädellövskogar med sekundärträd), i tallsumpskogar med höga naturvärden, i naturskogar med naturlig dynamik, samt i bestånd med förutsättningar att återskapa ovanstående naturtyper. */}
              </Typography>
            </CardContent>
          </Card>
        </Popover>
      );
    } else {
      return (
        <Popover
          id="mouse-over-class-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          style={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableRestoreFocus
        >
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Huggningsklasser (Beteckning för skogens utvecklingsstadium):
              </Typography>
              <Typography variant="body2">
                K1 = Kalmark före föryngringsåtgärder{" "}
              </Typography>
              <Typography variant="body2">
                K2 = Kalmark som har föryngrats{" "}
              </Typography>
              <Typography variant="body2">
                R1 = Röjningsskog lägre än 1,3 m{" "}
              </Typography>
              <Typography variant="body2">
                R2 = Röjningsskog över 1,3 m{" "}
              </Typography>
              <Typography variant="body2">G1 = Yngre gallringsskog </Typography>
              <Typography variant="body2">
                G2 = Äldre gallringsskog som uppnått lägsta ålder för
                slutavverkning{" "}
              </Typography>
              <Typography variant="body2">
                S1 = Yngre slutavverkningsbar skog{" "}
              </Typography>
              <Typography variant="body2">
                S2 = Mogen avverkningsbar skog som bör slutavverkas{" "}
              </Typography>
              <Typography variant="body2">
                S3 = Skog som är mogen att slutavverka men som bör sparas av
                till exempel naturvårdsskäl.{" "}
              </Typography>
            </CardContent>
          </Card>
        </Popover>
      );
    }
  };
  return (
    <React.Fragment>
      {PopoverContent(id)}
      <InfoIcon
        aria-owns={open ? type : undefined}
        aria-haspopup="true"
        onMouseEnter={(e) => handlePopoverOpen(e, id)}
        onMouseLeave={handlePopoverClose}
        fontSize="small"
      />
    </React.Fragment>
  );
};

export default ClassPopoverInfo;
