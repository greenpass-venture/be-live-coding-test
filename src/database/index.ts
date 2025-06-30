export type Activity = {
  id: string;
  name: string;
  description: string;
  emissionVolume: number;
  unit: string;
  activityDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

// Use this array to store the activities
export const activitiesList: Activity[] = [];
