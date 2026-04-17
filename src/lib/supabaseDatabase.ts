export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          full_name: string | null;
          role: string;
          can_edit_injuries: boolean | null;
          can_edit_phases: boolean | null;
          can_edit_supplements: boolean | null;
          can_delete: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          full_name?: string | null;
          role?: string;
          can_edit_injuries?: boolean | null;
          can_edit_phases?: boolean | null;
          can_edit_supplements?: boolean | null;
          can_delete?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          full_name?: string | null;
          role?: string;
          can_edit_injuries?: boolean | null;
          can_edit_phases?: boolean | null;
          can_edit_supplements?: boolean | null;
          can_delete?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      assessment_leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          calculator_type: string;
          lang: 'en' | 'ar';
          result_summary: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          calculator_type: string;
          lang: 'en' | 'ar';
          result_summary: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          calculator_type?: string;
          lang?: 'en' | 'ar';
          result_summary?: string;
        };
      };
      assessments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          name: string | null;
          email: string | null;
          calculator_type: string;
          value_label: string;
          value_numeric: number | null;
          value_unit: string | null;
          lang: 'en' | 'ar';
          note: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          name?: string | null;
          email?: string | null;
          calculator_type: string;
          value_label: string;
          value_numeric?: number | null;
          value_unit?: string | null;
          lang: 'en' | 'ar';
          note?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          name?: string | null;
          email?: string | null;
          calculator_type?: string;
          value_label?: string;
          value_numeric?: number | null;
          value_unit?: string | null;
          lang?: 'en' | 'ar';
          note?: string | null;
        };
      };
      articles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          lang: 'en' | 'ar';
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          date: string;
          icon: string;
          image: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          lang: 'en' | 'ar';
          slug: string;
          title: string;
          excerpt?: string;
          content?: string;
          category?: string;
          date: string;
          icon?: string;
          image?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          lang?: 'en' | 'ar';
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          date?: string;
          icon?: string;
          image?: string | null;
        };
      };
      injuries: {
        Row: {
          id: string;
          injury_id_slug: string;
          name_en: string;
          name_ar: string;
          category: string;
          body_region_en: string;
          body_region_ar: string;
          overview_en: string | null;
          overview_ar: string | null;
          rehab_summary_en: string | null;
          rehab_summary_ar: string | null;
          common_in: string[] | null;
          red_flags: string[] | null;
          related_calculators: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          injury_id_slug: string;
          name_en: string;
          name_ar: string;
          category: string;
          body_region_en: string;
          body_region_ar: string;
          overview_en?: string | null;
          overview_ar?: string | null;
          rehab_summary_en?: string | null;
          rehab_summary_ar?: string | null;
          common_in?: string[] | null;
          red_flags?: string[] | null;
          related_calculators?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          injury_id_slug?: string;
          name_en?: string;
          name_ar?: string;
          category?: string;
          body_region_en?: string;
          body_region_ar?: string;
          overview_en?: string | null;
          overview_ar?: string | null;
          rehab_summary_en?: string | null;
          rehab_summary_ar?: string | null;
          common_in?: string[] | null;
          red_flags?: string[] | null;
          related_calculators?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      injury_phases: {
        Row: {
          id: string;
          injury_id: string;
          phase_number: number;
          label_en: string;
          label_ar: string;
          duration_en: string;
          duration_ar: string;
          recovery_window: string;
          goals_en: string[] | null;
          goals_ar: string[] | null;
          nutrition_focus_en: string[] | null;
          nutrition_focus_ar: string[] | null;
          recommended_foods_en: string[] | null;
          recommended_foods_ar: string[] | null;
          avoid_foods_en: string[] | null;
          avoid_foods_ar: string[] | null;
          focus_en: string | null;
          focus_ar: string | null;
          progression_markers_en: string[] | null;
          progression_markers_ar: string[] | null;
          cautions_en: string[] | null;
          cautions_ar: string[] | null;
          nutrition_notes_en: string[] | null;
          nutrition_notes_ar: string[] | null;
          exercise_plans: Json[] | null;
          exercises_en: string[] | null;
          exercises_ar: string[] | null;
          prohibited_movements_en: string[] | null;
          prohibited_movements_ar: string[] | null;
          protein_min_per_kg: number | null;
          protein_max_per_kg: number | null;
          hydration_ml_per_kg: number | null;
          omega3_grams: number | null;
          creatine_grams: number | null;
          collagen_min_per_kg: number | null;
          collagen_max_per_kg: number | null;
          vitamin_c_mg: number | null;
          calcium_mg: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          injury_id: string;
          phase_number: number;
          label_en: string;
          label_ar: string;
          duration_en: string;
          duration_ar: string;
          recovery_window: string;
          goals_en?: string[] | null;
          goals_ar?: string[] | null;
          nutrition_focus_en?: string[] | null;
          nutrition_focus_ar?: string[] | null;
          recommended_foods_en?: string[] | null;
          recommended_foods_ar?: string[] | null;
          avoid_foods_en?: string[] | null;
          avoid_foods_ar?: string[] | null;
          focus_en?: string | null;
          focus_ar?: string | null;
          progression_markers_en?: string[] | null;
          progression_markers_ar?: string[] | null;
          cautions_en?: string[] | null;
          cautions_ar?: string[] | null;
          nutrition_notes_en?: string[] | null;
          nutrition_notes_ar?: string[] | null;
          exercise_plans?: Json[] | null;
          exercises_en?: string[] | null;
          exercises_ar?: string[] | null;
          prohibited_movements_en?: string[] | null;
          prohibited_movements_ar?: string[] | null;
          protein_min_per_kg?: number | null;
          protein_max_per_kg?: number | null;
          hydration_ml_per_kg?: number | null;
          omega3_grams?: number | null;
          creatine_grams?: number | null;
          collagen_min_per_kg?: number | null;
          collagen_max_per_kg?: number | null;
          vitamin_c_mg?: number | null;
          calcium_mg?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          injury_id?: string;
          phase_number?: number;
          label_en?: string;
          label_ar?: string;
          duration_en?: string;
          duration_ar?: string;
          recovery_window?: string;
          goals_en?: string[] | null;
          goals_ar?: string[] | null;
          nutrition_focus_en?: string[] | null;
          nutrition_focus_ar?: string[] | null;
          recommended_foods_en?: string[] | null;
          recommended_foods_ar?: string[] | null;
          avoid_foods_en?: string[] | null;
          avoid_foods_ar?: string[] | null;
          focus_en?: string | null;
          focus_ar?: string | null;
          progression_markers_en?: string[] | null;
          progression_markers_ar?: string[] | null;
          cautions_en?: string[] | null;
          cautions_ar?: string[] | null;
          nutrition_notes_en?: string[] | null;
          nutrition_notes_ar?: string[] | null;
          exercise_plans?: Json[] | null;
          exercises_en?: string[] | null;
          exercises_ar?: string[] | null;
          prohibited_movements_en?: string[] | null;
          prohibited_movements_ar?: string[] | null;
          protein_min_per_kg?: number | null;
          protein_max_per_kg?: number | null;
          hydration_ml_per_kg?: number | null;
          omega3_grams?: number | null;
          creatine_grams?: number | null;
          collagen_min_per_kg?: number | null;
          collagen_max_per_kg?: number | null;
          vitamin_c_mg?: number | null;
          calcium_mg?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      meal_examples: {
        Row: {
          id: string;
          phase_id: string;
          diet_style: string;
          breakfast_en: string;
          breakfast_ar: string;
          lunch_en: string;
          lunch_ar: string;
          dinner_en: string;
          dinner_ar: string;
          snack_en: string | null;
          snack_ar: string | null;
          shopping_list_en: string[] | null;
          shopping_list_ar: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          phase_id: string;
          diet_style: string;
          breakfast_en: string;
          breakfast_ar: string;
          lunch_en: string;
          lunch_ar: string;
          dinner_en: string;
          dinner_ar: string;
          snack_en?: string | null;
          snack_ar?: string | null;
          shopping_list_en?: string[] | null;
          shopping_list_ar?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          phase_id?: string;
          diet_style?: string;
          breakfast_en?: string;
          breakfast_ar?: string;
          lunch_en?: string;
          lunch_ar?: string;
          dinner_en?: string;
          dinner_ar?: string;
          snack_en?: string | null;
          snack_ar?: string | null;
          shopping_list_en?: string[] | null;
          shopping_list_ar?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      injury_page_content: {
        Row: {
          id: string;
          injury_id: string;
          intro_en: string | null;
          intro_ar: string | null;
          symptoms_en: string[] | null;
          symptoms_ar: string[] | null;
          rehab_notes_en: string[] | null;
          rehab_notes_ar: string[] | null;
          nutrition_notes_en: string[] | null;
          nutrition_notes_ar: string[] | null;
          faq_items: Json[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          injury_id: string;
          intro_en?: string | null;
          intro_ar?: string | null;
          symptoms_en?: string[] | null;
          symptoms_ar?: string[] | null;
          rehab_notes_en?: string[] | null;
          rehab_notes_ar?: string[] | null;
          nutrition_notes_en?: string[] | null;
          nutrition_notes_ar?: string[] | null;
          faq_items?: Json[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          injury_id?: string;
          intro_en?: string | null;
          intro_ar?: string | null;
          symptoms_en?: string[] | null;
          symptoms_ar?: string[] | null;
          rehab_notes_en?: string[] | null;
          rehab_notes_ar?: string[] | null;
          nutrition_notes_en?: string[] | null;
          nutrition_notes_ar?: string[] | null;
          faq_items?: Json[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      injury_protocol_import_runs: {
        Row: {
          id: string;
          source_name: string | null;
          raw_text: string;
          parsed_count: number;
          matched_count: number;
          unmatched_count: number;
          imported_slugs: string[] | null;
          unmatched_titles: string[] | null;
          status: string;
          notes: string | null;
          created_by: string | null;
          created_by_email: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          source_name?: string | null;
          raw_text: string;
          parsed_count?: number;
          matched_count?: number;
          unmatched_count?: number;
          imported_slugs?: string[] | null;
          unmatched_titles?: string[] | null;
          status?: string;
          notes?: string | null;
          created_by?: string | null;
          created_by_email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          source_name?: string | null;
          raw_text?: string;
          parsed_count?: number;
          matched_count?: number;
          unmatched_count?: number;
          imported_slugs?: string[] | null;
          unmatched_titles?: string[] | null;
          status?: string;
          notes?: string | null;
          created_by?: string | null;
          created_by_email?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      safety_notes: {
        Row: {
          id: string;
          injury_id: string;
          medications_en: string[] | null;
          medications_ar: string[] | null;
          supplements_en: string[] | null;
          supplements_ar: string[] | null;
          contraindication_medications: string[] | null;
          contraindication_supplements: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          injury_id: string;
          medications_en?: string[] | null;
          medications_ar?: string[] | null;
          supplements_en?: string[] | null;
          supplements_ar?: string[] | null;
          contraindication_medications?: string[] | null;
          contraindication_supplements?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          injury_id?: string;
          medications_en?: string[] | null;
          medications_ar?: string[] | null;
          supplements_en?: string[] | null;
          supplements_ar?: string[] | null;
          contraindication_medications?: string[] | null;
          contraindication_supplements?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      supplements: {
        Row: {
          id: string;
          phase_id: string;
          name: string;
          dose_en: string;
          dose_ar: string;
          reason_en: string;
          reason_ar: string;
          timing_en: string | null;
          timing_ar: string | null;
          caution_en: string | null;
          caution_ar: string | null;
          order_index: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          phase_id: string;
          name: string;
          dose_en: string;
          dose_ar: string;
          reason_en: string;
          reason_ar: string;
          timing_en?: string | null;
          timing_ar?: string | null;
          caution_en?: string | null;
          caution_ar?: string | null;
          order_index?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          phase_id?: string;
          name?: string;
          dose_en?: string;
          dose_ar?: string;
          reason_en?: string;
          reason_ar?: string;
          timing_en?: string | null;
          timing_ar?: string | null;
          caution_en?: string | null;
          caution_ar?: string | null;
          order_index?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
};

export type TableRow<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Row'];
export type TableInsert<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Insert'];
export type TableUpdate<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Update'];

