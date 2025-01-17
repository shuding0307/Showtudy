export interface IMyStudyType {
  additionalInfos: string[];
  category: string;
  created_time: string;
  cur_participants_num: number;
  end_date: string;
  id: number;
  max_participants_num: number;
  progress_todo: {
    complete_num: number;
    percent: number;
    total_num: number;
  };
  start_date: string;
  status: string;
  title: string;
}
