import { Area, CreateAreaRequest, UpdateAreaRequest, AreaFilters } from '../types/area';
// import api from '../config/api'; // TODO: Uncomment when implementing real API calls

// Mock data for development - replace with actual API calls
const mockAreas: Area[] = [
  {
    id: 1,
    name: 'Downtown District',
    country: 'Palestine',
    city: 'Ramallah',
    description: 'Central business district with high-rise buildings and commercial areas',
    postalCode: '00970',
    coordinates: {
      latitude: 31.9038,
      longitude: 35.2034
    },
    status: 'Active',
    createdDate: '2024-01-15',
    updatedDate: '2024-01-15',
    createdBy: 'Admin',
    updatedBy: 'Admin'
  },
  {
    id: 2,
    name: 'Old City',
    country: 'Palestine',
    city: 'Jerusalem',
    description: 'Historic area with ancient buildings and cultural sites',
    postalCode: '91000',
    coordinates: {
      latitude: 31.7767,
      longitude: 35.2345
    },
    status: 'Active',
    createdDate: '2024-01-10',
    updatedDate: '2024-01-20',
    createdBy: 'Admin',
    updatedBy: 'Manager'
  },
  {
    id: 3,
    name: 'Industrial Zone',
    country: 'Palestine',
    city: 'Nablus',
    description: 'Manufacturing and industrial facilities area',
    postalCode: '44000',
    coordinates: {
      latitude: 32.2211,
      longitude: 35.2544
    },
    status: 'Active',
    createdDate: '2024-01-05',
    updatedDate: '2024-01-18',
    createdBy: 'Admin',
    updatedBy: 'Admin'
  },
  {
    id: 4,
    name: 'Coastal Area',
    country: 'Palestine',
    city: 'Gaza',
    description: 'Beachfront residential and commercial area',
    postalCode: '79000',
    coordinates: {
      latitude: 31.5017,
      longitude: 34.4668
    },
    status: 'Inactive',
    createdDate: '2024-01-01',
    updatedDate: '2024-01-25',
    createdBy: 'Admin',
    updatedBy: 'Manager'
  },
  {
    id: 5,
    name: 'University District',
    country: 'Palestine',
    city: 'Bethlehem',
    description: 'Educational institutions and student housing area',
    postalCode: '90000',
    coordinates: {
      latitude: 31.7054,
      longitude: 35.2024
    },
    status: 'Active',
    createdDate: '2024-01-12',
    updatedDate: '2024-01-22',
    createdBy: 'Manager',
    updatedBy: 'Manager'
  }
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const areaService = {
  // Get all areas with optional filters
  async getAreas(filters?: AreaFilters): Promise<Area[]> {
    try {
      // In a real application, this would be an API call
      // const response = await api.get('/v1/web/area/list', { params: filters });
      
      // For now, return mock data with client-side filtering
      let filteredAreas = [...mockAreas];
      
      if (filters) {
        if (filters.country) {
          filteredAreas = filteredAreas.filter(area => 
            area.country.toLowerCase().includes(filters.country!.toLowerCase())
          );
        }
        
        if (filters.city) {
          filteredAreas = filteredAreas.filter(area => 
            area.city.toLowerCase().includes(filters.city!.toLowerCase())
          );
        }
        
        if (filters.status) {
          filteredAreas = filteredAreas.filter(area => area.status === filters.status);
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredAreas = filteredAreas.filter(area => 
            area.name.toLowerCase().includes(searchTerm) ||
            area.description?.toLowerCase().includes(searchTerm) ||
            area.postalCode?.toLowerCase().includes(searchTerm)
          );
        }
      }
      
      // Format dates for display
      return filteredAreas.map(area => ({
        ...area,
        createdDate: formatDate(area.createdDate),
        updatedDate: formatDate(area.updatedDate)
      }));
    } catch (error) {
      console.error('Error fetching areas:', error);
      throw new Error('Failed to fetch areas');
    }
  },

  // Get area by ID
  async getAreaById(id: number): Promise<Area> {
    try {
      // const response = await api.get(`/v1/web/area/${id}`);
      
      const area = mockAreas.find(area => area.id === id);
      if (!area) {
        throw new Error('Area not found');
      }
      
      return {
        ...area,
        createdDate: formatDate(area.createdDate),
        updatedDate: formatDate(area.updatedDate)
      };
    } catch (error) {
      console.error('Error fetching area:', error);
      throw new Error('Failed to fetch area');
    }
  },

  // Create new area
  async createArea(areaData: CreateAreaRequest): Promise<Area> {
    try {
      // const response = await api.post('/v1/web/area/create', areaData);
      
      const newArea: Area = {
        id: Math.max(...mockAreas.map(a => a.id)) + 1,
        ...areaData,
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        updatedBy: 'Current User'
      };
      
      mockAreas.push(newArea);
      
      return {
        ...newArea,
        createdDate: formatDate(newArea.createdDate),
        updatedDate: formatDate(newArea.updatedDate)
      };
    } catch (error) {
      console.error('Error creating area:', error);
      throw new Error('Failed to create area');
    }
  },

  // Update area
  async updateArea(areaData: UpdateAreaRequest): Promise<Area> {
    try {
      // const response = await api.put(`/v1/web/area/${areaData.id}`, areaData);
      
      const areaIndex = mockAreas.findIndex(area => area.id === areaData.id);
      if (areaIndex === -1) {
        throw new Error('Area not found');
      }
      
      const updatedArea = {
        ...mockAreas[areaIndex],
        ...areaData,
        updatedDate: new Date().toISOString().split('T')[0],
        updatedBy: 'Current User'
      };
      
      mockAreas[areaIndex] = updatedArea;
      
      return {
        ...updatedArea,
        createdDate: formatDate(updatedArea.createdDate),
        updatedDate: formatDate(updatedArea.updatedDate)
      };
    } catch (error) {
      console.error('Error updating area:', error);
      throw new Error('Failed to update area');
    }
  },

  // Delete area
  async deleteArea(id: number): Promise<void> {
    try {
      // const response = await api.delete(`/v1/web/area/${id}`);
      
      const areaIndex = mockAreas.findIndex(area => area.id === id);
      if (areaIndex === -1) {
        throw new Error('Area not found');
      }
      
      mockAreas.splice(areaIndex, 1);
    } catch (error) {
      console.error('Error deleting area:', error);
      throw new Error('Failed to delete area');
    }
  },

  // Get unique countries
  async getCountries(): Promise<string[]> {
    try {
      const countries = [...new Set(mockAreas.map(area => area.country))];
      return countries.sort();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  },

  // Get cities by country
  async getCitiesByCountry(country: string): Promise<string[]> {
    try {
      const cities = [...new Set(
        mockAreas
          .filter(area => area.country === country)
          .map(area => area.city)
      )];
      return cities.sort();
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw new Error('Failed to fetch cities');
    }
  }
};
