export type IssueType = 'pothole' | 'garbage' | 'streetlight' | 'traffic' | 'water' | 'other';

export type ReportStatus = 'pending' | 'done' | 'rejected';

export interface Report {
  id: string;
  citizenId: string;
  citizenName: string;
  issueType: IssueType;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: ReportStatus;
  dateReported: Date;
  dateObserved: Date;
  media?: {
    type: 'photo' | 'video';
    url: string;
  }[];
  departmentNotes?: string;
  citizenRating?: number;
  trustRating: number;
}

export interface ReportFormData {
  issueType: IssueType;
  description: string;
  location: string;
  dateObserved: Date;
  media?: File[];
}