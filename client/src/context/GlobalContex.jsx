import { createContext, useContext, useState } from 'react';

// Crear el contexto
const GlobalContext = createContext();

const apiURL = import.meta.env.VITE_API_URL;

// Crear un proveedor de contexto
export const GlobalProvider = ({ children }) => {
    const [statusID, setStatusID] = useState(null);
    const [docEntry, setDocEntry] = useState(null);
    const [automaticLead, setAutomaticLead] = useState(null);

    // const getDataWareHouse = async (check) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getExistenceByWareHouse?checkStock=${check}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getDataLocation = async (check) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getExistenceByLocation?checkStock=${check}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data location:', error);
    // }
    // }
    // 
    // const getLocationsByProduct = async (productID, whsCode) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/seeLocationByProductID?productID=${productID}&whsCode=${whsCode}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data location:', error);
    // }
    // }
    // 
    // const getDataProduct = async (check) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getExistenceByProduct?checkStock=${check}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getKardex = async (productID, fechaInicio, fechaFin, movimiento) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getKardex?productID=${productID}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&movimiento=${movimiento}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getMovementsKardex = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getMovementsKardex`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getDataMovementsDay = async (date) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getMovementsOfDay?date=${date}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getTypesProducts = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getTypesProducts`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getSuppliers = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getSuppliers`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getDataProductMinimum = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getLowStockProducts`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getInfoVehicles = async () => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getInfoVehicles`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getHistoricVehicles = async (vehicleID) => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getHistoricVehicles?vehicleID=${vehicleID}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getHistoryCreatedNotices = async (date, apparatusID, operatorID, statusID) => {
    // try {
    // const response = await fetch(`${apiURL}/reportsController/getHistoryCreatedNotices?date=${date}&apparatusID=${apparatusID}&operatorID=${operatorID}&statusID=${statusID}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getPendingMaterial = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getPendingMaterial`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getControlSales = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getControlSales`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getPhotosByNoticeHeaderID = async (NoticeHeaderID) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getPhotosByNoticeHeaderID?NoticeHeaderID=${NoticeHeaderID}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getStatusPendingMaterial = async () => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getStatusPendingMaterial`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getMaterialExpenses = async (DocEntry) => {
    // try {
    // const response = await fetch(`${apiURL}/logisticController/getMaterialExpenses?DocEntry=${DocEntry}`);
    // 
    // if (!response.ok) {
    // if (!response.message) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getStatusDayAndCapacity = async (date, apparatusID, zone) => {
    // try {
    // let queryParams = '';
    // 
    // if (date) {
    // queryParams += `date=${date}&`;  // Filtro por fecha
    // }
    // if (apparatusID) {
    // queryParams += `apparatusID=${apparatusID}&`;  // Filtro por apparatusID
    // }
    // if (zone) {
    // queryParams += `zone=${zone}&`;  // Filtro por zone
    // }
    // 
    // Quitar el último "&" sobrante
    // queryParams = queryParams.slice(0, -1);
    // 
    // const response = await fetch(`${apiURL}/agendaController/getStatusDayAndCapacity?${queryParams}`);
    // if (!response.ok) {
    // if (!response.message) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // return response.message;
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getAgendaData = async (date, TechnicID) => {
    // try {
    // const technicParam = TechnicID ? `&technicID=${TechnicID}` : ""
    // const response = await fetch(`${apiURL}/agendaController/agendaData?date=${date}${technicParam}`);
    // 
    // if (!response.ok) {
    // if (!response.message) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const lockNoticeHeader = async (NoticeHeaderID, UserName) => {
    // try {
    // const response = await fetch(`${apiURL}/agendaController/lockNoticeHeader`, {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json"
    // },
    // body: JSON.stringify({ NoticeHeaderID, UserName })
    // })
    // if (!response.ok) {
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const unlockNoticeHeader = async (NoticeHeaderID, DocEntry, AutomaticLead) => {
    // try {
    // const response = await fetch(`${apiURL}/agendaController/unlockNoticeHeader`, {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json"
    // },
    // body: JSON.stringify({ NoticeHeaderID, DocEntry, AutomaticLead })
    // })
    // if (!response.ok) {
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const setForceEvent = async (Date, EventID, TechnicID, Locked) => {
    // try {
    // const response = await fetch(`${apiURL}/agendaController/setForceEvent`, {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json"
    // },
    // body: JSON.stringify({ Date, EventID, TechnicID, Locked })
    // })
    // if (!response.ok) {
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getPetitionNumber = async (NoticeHeaderID, TechnicID, date) => {
    // try {
    // const response = await fetch(`${apiURL}/agendaController/getPetitionNumber?NoticeHeaderID=${NoticeHeaderID}&TechnicID=${TechnicID}&date=${date}`);
    // 
    // if (!response.ok) {
    // if (!response.message) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const insertObservation = async (LoginID, item, technic, newTechnic, forced) => {
    // try {
    // const body = forced === 1
    // ? { LoginID, item, technic, newTechnic, forced }
    // : { LoginID, item, technic, newTechnic };
    // 
    // const response = await fetch(`${apiURL}/agendaController/insertLogObservation`, {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json"
    // },
    // body: JSON.stringify(body)
    // })
    // if (!response.ok) {
    // return response.message
    // }
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getTechnicsAllInfo = async () => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getTechnicsAllInfo`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getTechnicSpecialities = async (TechnicID, ProductFamilyID) => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getTechnicSpecialities?technicID=${TechnicID}&familyID=${ProductFamilyID}`);
    // 
    // if (!response.ok) {
    // if (!response.message) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // return response.message
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error);
    // }
    // }
    // 
    // const getDataTpvsEmpresa = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTpvsEmpresa`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getDataDirectTpvsInvoices = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getDirectTpvsInvoices`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error)
    // }
    // }
    // 
    // const getDataTpvsVentasAutonomos = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTpvsVentasAutonomos`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error('Error fetching data production:', error)
    // }
    // }
    // 
    // const getDataTransferenciasAvisos = async (Collaborator, StatusFilter) => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTransferenciasAvisos?Collaborator=${Collaborator}&StatusFilter=${StatusFilter}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error('Error fetching data production:', error)
    // }
    // }
    // 
    // const getDataTransferenciasFacturasDirectas = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTransferenciasFacturasDirectas`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error('Error fetching data production:', error)
    // }
    // }
    // 
    // const getTechnicsCapacity = async (queryParams) => {
    // try {
    // const response = await fetch(`${apiURL}/agendaController/getTechnicsCapacity${queryParams}`)
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json()
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error)
    // }
    // }
    // 
    // const getDataAutoliquidaciones = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getAutoliquidaciones`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getDataTransferVentasAutonomos = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTransferenciasVentasAutonomos`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getDataTpvTransferLiquidAutonomos = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getTpvsTransferLiquidAutonomos`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getDataPaymentMethods = async () => {
    // try {
    // const response = await fetch(`${apiURL}/administrationController/getPaymentMethods`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // 
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getSalesTechnics = async (date, endDate, technicID, apparatusID) => {
    // try {
    // const response = await fetch(`${apiURL}/reportsController/getSales?date=${date}&endDate=${endDate}&technicID=${technicID}&apparatusID=${apparatusID}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getLeadSuppliers = async () => {
    // try {
    // const response = await fetch(`${apiURL}/noticeController/getLeadSuppliers`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getNoticesByDay = async (date, endDate, statusID, leadType, leadSupplierID, loginID, apparatusID) => {
    // try {
    // const response = await fetch(`${apiURL}/reportsController/getNoticesByDay?date=${date}&endDate=${endDate}&statusID=${statusID}&leadType=${leadType}&leadSupplierID=${leadSupplierID}&loginID=${loginID}&apparatusID=${apparatusID}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getLeads = async () => {
    // try {
    // const response = await fetch(`${apiURL}/reportsController/getLeads`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getPersonalIssues = async (technicID, year) => {
    // try {
    // const response = await fetch(`${apiURL}/rrhhController/getPersonalIssues?technicID=${technicID}&year=${year}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getMeetings = async (LoginID) => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getMeetings?LoginID=${LoginID}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getPendingsBubblesData = async (statusID) => {
    // try {
    // const response = await fetch(`${apiURL}/noticeController/getPendingBubbles?statusID=${statusID}`);
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // 
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error('Error fetching data production:', error);
    // }
    // }
    // 
    // const getQualityControl = async (docEntry, selectedTechnic) => {
    // try {
    // const response = await fetch(`${apiURL}/generalController/getQualityControl?docEntry=${docEntry}&technicID=${selectedTechnic}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getStatusActions = async () => {
    // try {
    // const response = await fetch(`${apiURL}/noticeController/getStatusActions`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getTechnicTimes = async (technicID, startDate, endDate) => {
    // try {
    // const response = await fetch(`${apiURL}/reportsController/getTechnicTimes?TechnicID=${technicID}&startDate=${startDate}&endDate=${endDate}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getTickets = async (loginID) => {
    // try {
    // const loginParam = loginID ? `?loginID=${loginID}` : ""
    // const response = await fetch(`${apiURL}/helpdeskController/getTickets${loginParam}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getCommentsTicket = async (ticketID) => {
    // try {
    // const response = await fetch(`${apiURL}/helpdeskController/getComments?ticketID=${ticketID}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getUnreadTicket = async (LoginID) => {
    // try {
    // const response = await fetch(`${apiURL}/helpdeskController/ticketIDsUnreads?LoginID=${LoginID}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getFilesTicket = async (ticketID) => {
    // try {
    // const response = await fetch(`${apiURL}/helpdeskController/getFiles?ticketID=${ticketID}`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getPayRolls = async () => {
    // try {
    // const response = await fetch(`${apiURL}/rrhhController/getPayRolls`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }
    // 
    // const getProducts = async (filter) => {
    // try {
    // const response = await fetch(`${apiURL}/quotitationController/getProducts`);
    // 
    // if (!response.ok) {
    // throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const data = await response.json();
    // return data
    // } catch (error) {
    // console.error(error)
    // }
    // }

    return (
        <GlobalContext.Provider value={{
            // statusID, setStatusID, docEntry, setDocEntry, automaticLead, setAutomaticLead, getDataWareHouse, getDataLocation, getLocationsByProduct, getDataProduct, getKardex, getMovementsKardex, getDataMovementsDay, getTypesProducts, getSuppliers, getDataProductMinimum, getInfoVehicles, getHistoricVehicles, getHistoryCreatedNotices, getPendingMaterial, getControlSales, getPhotosByNoticeHeaderID, getStatusPendingMaterial, getMaterialExpenses, getStatusDayAndCapacity, getAgendaData, lockNoticeHeader, unlockNoticeHeader, setForceEvent, getPetitionNumber, insertObservation, getTechnicsAllInfo, getTechnicSpecialities, getDataTpvsEmpresa, getDataDirectTpvsInvoices, getDataTpvsVentasAutonomos, getDataTransferenciasAvisos, getDataTransferenciasFacturasDirectas, getTechnicsCapacity, getDataTransferenciasFacturasDirectas, getDataAutoliquidaciones, getDataTransferVentasAutonomos, getDataTpvTransferLiquidAutonomos, getDataPaymentMethods, getSalesTechnics, getLeadSuppliers, getNoticesByDay, getLeads, getPersonalIssues, getMeetings, getPendingsBubblesData, getQualityControl, getStatusActions, getTechnicTimes, getTickets, getCommentsTicket, getFilesTicket, getUnreadTicket, getPayRolls, getProducts 
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Crear un hook personalizado para usar el contexto
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
