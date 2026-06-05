import axios from "axios";

const API_URL = "http://localhost:3000/api/proposals";

export const createProposal = async (proposalData) => {
  const response = await axios.post(API_URL, proposalData);
  return response.data;
};

export const getProposals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProposalById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const publishProposal = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/publish`);
  return response.data;
};

export const signProposal = async (id, signatureData) => {
  const response = await axios.post(`${API_URL}/${id}/sign`, signatureData);
  return response.data;
};

export const simulateGoal = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/simulate-goal`);
  return response.data;
};

export const freezeExpedient = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/freeze`);
  return response.data;
};

export const sendToCongress = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/send`);
  return response.data;
};