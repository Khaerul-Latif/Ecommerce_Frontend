import React from 'react'
import  styles from './index.module.css'
import GetReview from '@/components/review-produk'

const ReviewProduk = () => {
 return(
  <div className={styles.container}>
    <GetReview/>
  </div>
 )
}

export default ReviewProduk