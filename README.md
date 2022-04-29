# DNA Test
---
> Tugas Besar 3 Mata Kuliah IF2211 Strategi Algoritma ITB.

## Table of Contents
- [# DNA Test](#-dna-test)
- [Table of Contents](#table-of-contents)
- [General Information](#general-information)
- [Creator](#creator)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
<!-- * [License](#license) -->


## General Information
> DNA Test is a web application that provides a platform for users to analyze the presence of a disease based on DNA Sequences. Methodology used by this DNA Test Web implements Knuth-Morris-Pratt algorithm, Bayer-Moore algorithm, Levenshtein algorithm, Brute-force algorithm, and Regular Expression algorithm. 

## Creator
| Name | NIM |
| ---  | --- |
|Adiyansa Prasetya Wicaksana  | 13520044 
|Januar Budi Ghifari | 13520132
|Rania Dwi Fadhilah | 13520142

## Features
- Analyze Presence of a Disease based on DNA Sequences
- Add a new disease
- Look for search history

## Technologies Used
- Node.js
- MySQL
- React (Chakra)
- ExpressJS

## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->

## Setup
- Clone this repository
- Setup node modules using npm. Follow this command:
```
cd src
npm install
cd src/client
npm install
```
- Configure your MySQL username and password in `src/config/db.config.js`.
- Create database `tehbotolsourcecode` in your MySQL. 
- Open MySQL, use database `tehbotolsourcecode` and copy paste command in in `src/config/db.txt` .

## Usage
- To run the web server concurrently `npm run dev` in src.


## Project Status
| Task | Status |
| ---  | --- |
|Kebenaran program  | Complete 
|Pemahaman terhadap cara kerja program | Complete
|Interface, Features, dan Unsur Kreativitas | Complete
|Membuat fitur tingkat kemiripan DNA pengguna dengan DNA penyakit | Complete

## Acknowledgements
This project was made in order to fulfill the 3rd **Tugas Besar Mata Kuliah IF2211 Strategi Algoritma** from **Institut Teknologi Bandung**.
[Specification](doc/Tugas-Besar-3-IF2211-Strategi-Algoritma-2022.pdf)