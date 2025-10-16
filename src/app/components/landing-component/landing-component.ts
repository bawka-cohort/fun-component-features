import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface RestaurantCard {
  name: string;
  image: string;
  rating: number;
  distance: string;
}

interface RecommendationCard {
  name: string;
  image: string;
  rating: number;
  userAvatar: string;
  badge?: string;
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-component.html',
})
export class LandingComponent implements OnInit {
  user: any = null;
  isMenuOpen: boolean = false;

  // Popular & Trending carousel data
  popularRestaurants: RestaurantCard[] = [
    {
      name: 'Saigon Basil - Tofu Pho',
      image: 'https://picsum.photos/seed/rest1/400/300',
      rating: 4.8,
      distance: '7.6 mi.',
    },
    {
      name: 'Mahek Restaurant: Tikka Masala',
      image: 'https://picsum.photos/seed/rest2/400/300',
      rating: 4.5,
      distance: '10.1 mi.',
    },
    {
      name: 'Tokyo Ramen House',
      image: 'https://picsum.photos/seed/rest3/400/300',
      rating: 4.7,
      distance: '5.2 mi.',
    },
    {
      name: 'Italian Corner Bistro',
      image: 'https://picsum.photos/seed/rest4/400/300',
      rating: 4.6,
      distance: '8.3 mi.',
    },
  ];

  // Recommendations from people you follow
  followingRecommendations: RecommendationCard[] = [
    {
      name: 'You have to come here',
      image: 'https://picsum.photos/seed/rec1/300/400',
      rating: 4.5,
      userAvatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'AMAZING!',
      image: 'https://picsum.photos/seed/rec2/300/400',
      rating: 4.8,
      userAvatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: "Garlic pesto but I don't regret getting this",
      image: 'https://picsum.photos/seed/rec3/300/400',
      rating: 4.2,
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      badge: "Garlic pesto but I don't regret getting this",
    },
    {
      name: 'Best pizza ever!',
      image: 'https://picsum.photos/seed/rec4/300/400',
      rating: 4.5,
      userAvatar: 'https://i.pravatar.cc/150?img=4',
    },
  ];

  // Local Recommendations
  localRecommendations: RestaurantCard[] = [
    {
      name: 'Fire Wok - Fried Shrimp',
      image: 'https://picsum.photos/seed/local1/400/300',
      rating: 4.9,
      distance: '2.1 mi.',
    },
    {
      name: 'Saigon Basil - Tofu Pho',
      image: 'https://picsum.photos/seed/local2/400/300',
      rating: 4.8,
      distance: '7.6 mi.',
    },
    {
      name: 'Bangkok Street Food',
      image: 'https://picsum.photos/seed/local3/400/300',
      rating: 4.6,
      distance: '4.8 mi.',
    },
  ];

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    const session = await this.supabase.getSessionAsync();
    this.user = session?.user ?? null;

    // Listen for auth state changes
    this.supabase.onAuthChange((_event, session) => {
      this.user = session?.user ?? null;
    });
  }

  async signOut() {
    await this.supabase.signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

  getProfileImage(user: any): string | null {
    let url = user.user_metadata.avatar_url;
    if (!url || url.trim() === '') {
      return null;
    }
    if (url.includes('googleusercontent.com') && !url.includes('=s')) {
      url += '?sz=100';
    }
    return url;
  }

  // Helper method to create star rating array
  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(0)
      .map((_, i) => i < Math.floor(rating));
  }
}
