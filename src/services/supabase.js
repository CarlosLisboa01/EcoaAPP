import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqylrvxhnkwanwmijuru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeWxydnhobmt3YW53bWlqdXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTU2NzAsImV4cCI6MjA5Mjg5MTY3MH0.jhWNefSgBq0U0cwnLwSlNGChKs_Daq4eBlSR4RX31to';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
