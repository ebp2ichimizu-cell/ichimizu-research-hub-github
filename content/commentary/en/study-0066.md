---
study_id: "study-0066"
title: "Reading Crime Risk through Human Mobility: Why More People Does Not Simply Mean More Crime"
original_title: "犯罪発生に関わる人間の空間移動パターン―仙台市において発生した車上ねらいに着目して―"
authors: "Kazuki Hirama et al."
year: 2026
journal: "GIS—Theory & Applications 34(1), 37-47"
doi: "10.5638/thagis.34.1.5"
source_language: "ja"
commentary_language: "en"
commentary_status: "reviewed"
commentary_updated: "2026-11-24"
tags:
  - theft from vehicles
  - GIS
  - human mobility
  - crime pattern theory
  - crime prediction
  - targeting
---

# Reading Crime Risk through Human Mobility
## Why the relationship between movement and crime can differ from one area to another

> **About this commentary**  
> This page is an independent Research Hub commentary based on the full article available on J-STAGE.

---

## What did the study do?

The study examined vehicle-related theft in Sendai and asked whether future crime counts could be better explained by combining prior crime with patterns of human movement, including general-population inflows and the movements of past offenders.

It compared a city-wide Poisson regression with **geographically weighted Poisson regression (GWPR)**, which allows relationships to vary spatially.

---

## Main findings

GWPR performed better than the global model on the model-evaluation indicators used in the article. Areas in which crime was under-predicted fell from **104 under the global model to 81 under GWPR**.

Incoming movements of past offenders were generally positively associated with future vehicle-related theft.

General-population inflow, however, did not have one uniform relationship. It was positively associated with crime in some central and rail-corridor areas, but negatively associated in some northern suburban areas.

The practical point is that **"more people" is not a single criminogenic condition**. The meaning of mobility depends on urban structure and the activities represented by that movement.

---

<!-- STATS_DETAIL_START -->

## Check the statistics

The study compared:

- PR: one set of coefficients across the whole study area; and
- GWPR: local coefficients that may vary by area.

RMSE, AIC, AICc and residual spatial autocorrelation favoured GWPR in this dataset. The authors also mapped local parameter estimates after adjustment for multiple testing.

These results indicate improved model fit, not perfect prediction and not evidence that an intervention would work.

<!-- STATS_DETAIL_END -->

## Targeting is not the same as response effectiveness

In EBP terms, this study mainly informs **Targeting**: where risk may be concentrated and which spatial variables may help identify it.

A separate question is **Response**: whether patrol, environmental changes or another intervention at those locations actually reduces crime.

A good prediction model does not by itself establish an effective police response.

---

## Limitations

The article concerns one city and one crime type. It also notes that 2017 person-trip data were used in relation to 2021–22 crime, a period affected by COVID-era mobility changes. Police-recorded crime may omit unreported incidents, and offender movement was operationalised from residential origins even though offenders may travel to crime from other activity nodes.

Model specification also matters; other geographically varying count models could produce different results.

---

# Research Hub commentary: move beyond total footfall

For practice, the next analytical step is to distinguish mobility by purpose, time and setting rather than relying only on total inflow. Central entertainment areas, commuter zones and suburban shopping centres may generate very different mixtures of opportunity, guardianship and potential offenders.

---

## Take-away

**Predicting where crime may occur and proving that police concentration there will reduce crime are different questions.**

This study strengthens the targeting side of place-based analysis by showing that mobility–crime relationships can be spatially heterogeneous.

---

## Read the original study

- [J-STAGE](https://www.jstage.jst.go.jp/article/thagis/34/1/34_34.1.5/_article/-char/ja)
- [DOI: 10.5638/thagis.34.1.5](https://doi.org/10.5638/thagis.34.1.5)
