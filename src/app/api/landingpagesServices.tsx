import { env } from "process";
import { EmployeeData, HomepageData, ServiceData } from "../types/api";

// Function to fetch homepage data
export async function getHomepageData(): Promise<HomepageData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/landingccpageffjvjvjf/hjiomepadjdjjgekk`,
    {
      cache:'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch homepage data');
  }
  return res.json();
}

// Function to fetch service data
export async function getServiceData(): Promise<ServiceData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/landingpdddddagedkkdkdkk/service`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch service data');
  }
  return res.json();
}

// Function to fetch employee data
export async function getEmployeeData(): Promise<EmployeeData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/landingpage/employee`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch employee data');
  }
  return res.json();
}


// Function to fetch employee data
export async function getFooterIcons(): Promise<any> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/v1/factory-app/admin/home/footer/get`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    }
  );
  if (!res.ok) {
    return [];
  }
  return res.json();
}

